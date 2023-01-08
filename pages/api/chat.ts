import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPTAPIBrowser } from "chatgpt";

// REQUIRES: ENVIRONMENT VARIABLES (.env.local file in root for local development)
// - OPENAI_EMAIL
// - OPENAI_PASSWORD
// FOR GOOGLE SSO LOGIN INTO OPENAI

// https://go.postman.co/workspace/experimental~5aa617df-d439-4a42-99df-2daaf98e4fb1/collection/15334621-13f8fdb2-be19-4876-9f83-64abf6a724a7?action=share&creator=15334621
// TLDR: hit `/api/chat` with a POST (actually, we don't care about the protocol, but please use POST) request with a body containing the message you want to send to OpenAI in raw text format.
// The response will be a JSON object containing the response from OpenAI of type `OutData` (see below).
// Optional query parameters include `convID` and `prevMsgID` which are used to track the conversation. If you don't provide them, OpenAI will start a new conversation. If you do provide them, OpenAI will continue the conversation from the previous message.
// Do NOT provide those optional IDs as part of the body, but as query parameters in the request.

type ChatProps = {
    message: string;
    convID?: string;
    prevMsgID?: string;
};

async function chatWithGPT(props: ChatProps) {
    const { message, convID, prevMsgID } = props;

    // use puppeteer to bypass cloudflare (headful because of captchas)
    const api = new ChatGPTAPIBrowser({
        email: process.env.OPENAI_EMAIL ?? "NO_EMAIL_PROVIDED_IN_ENV",
        password: process.env.OPENAI_PASSWORD ?? "NO_PASSWORD_PROVIDED_IN_ENV",
        markdown: true,
        isGoogleLogin: true,
    });

    await api.initSession();

    const result = await api.sendMessage(message, {
        timeoutMs: 3 * 60 * 1000,
        conversationId: convID,
        parentMessageId: prevMsgID,
    });

    return {
        res: result.response,
        conversationId: result.conversationId,
        messageId: result.messageId,
    };
}

export type OutData = {
    Message: string;
    convID?: string;
    msgID?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<OutData>
) {
    const message = req.body;

    let inputProps: ChatProps = {
        message: message,
        convID: undefined,
        prevMsgID: undefined,
    };

    if (req.query["convID"]) {
        inputProps.convID = req.query["convID"] as string;
    }
    if (req.query["prevMsgID"]) {
        inputProps.prevMsgID = req.query["prevMsgID"] as string;
    }

    try {
        const response = await chatWithGPT(inputProps);
        res.status(200).json({
            Message: JSON.stringify(response.res),
            convID: response.conversationId,
            msgID: response.messageId,
        });
    } catch (e) {
        res.status(500).json({ Message: "Something went wrong" });
    }
}
