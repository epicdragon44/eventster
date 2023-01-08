import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

async function runCompletion(message: string) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
    });
    return completion.data.choices[0].text;
}

type OutData = {
    Message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<OutData>
) {
    const message = req.body;

    try {
        const response = await runCompletion(message);
        res.status(200).json({ Message: JSON.stringify(response) });
    } catch (e) {
        res.status(500).json({ Message: "Something went wrong" });
    }
}
