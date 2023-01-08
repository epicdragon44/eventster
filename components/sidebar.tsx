import { useRef } from "react";
import { useOutsideAlerter } from "../util/hooks";

type TypeOfPrompts = {
    [key: string]: {
        [key: string]: string;
    };
};

export const Prompts: TypeOfPrompts = {
    Ideation: {
        "Create an event concept":
            "Create a concept for a new conference about ...",
        "Assess event potential":
            "How many people would be interested in a new conference about ... ?",
    },
    Logistics: {
        "Source speakers": "Suggest speakers for a new conference about ...",
        "Source sponsors":
            "Suggest sponsor companies for a new conference about ...",
        "Source venues":
            "Suggest the ideal venue for a new conference about ...",
    },
    Copywriting: {
        "Write attendee promotional copy":
            "Create outlandish promotional copy for a new conference about ...",
        "Write sponsor promotional copy":
            "Write email inviting companies to sponsor a new conference about ...",
        "Write attendee email invitation":
            "Create an exciting email invitation for inviting attendees to a new conference about ...",
        "Write deadline reminder":
            "Write a reminder email for attendees to register for a new conference about ...",
        "Write a website FAQ":
            "Create an attendee FAQ for a new conference about ... taking place at the ... from ...",
        "Write questions for speakers":
            "Create questions to ask ... about how ... can be used",
        "Write an attendee thank-you email":
            "Write a heartfelt thank you email to attendees of the new conference about ...",
    },
    Surveying: {
        "Create a pre-conference attendee survey":
            "What questions should we ask attendees to improve ... at the conference about ...?",
        "Create a pre-conference sponsor survey":
            "What questions should we ask sponsors to improve ... at the conference about ...?",
        "Create a post-conference attendee survey":
            "What questions should we ask attendees to assess their return on investment from being part of the new conference about ...?",
        "Create a post-conference sponsor survey":
            "What questions should we ask sponsors to assess their return on investment from being part of the new conference about ...?",
    },
};

export const enum PromptCategories {
    Ideation = "Ideation",
    Logistics = "Logistics",
    Copywriting = "Copywriting",
    Surveying = "Surveying",
}

export const Sidebar = (props: {
    hidden: boolean;
    category: PromptCategories;
    chosenPrompt: (prompt: string) => void;
    closeMe: () => void;
}) => {
    const categoryObj = Prompts[props.category];

    const notifyClickOutside = useRef<HTMLDivElement>(null);
    useOutsideAlerter(notifyClickOutside, () => props.closeMe());

    return (
        <div
            ref={notifyClickOutside}
            className={`transition-all duration-500 ease-in-out fixed ${
                props.hidden ? "-right-80" : "right-0"
            } flex flex-col gap-6 w-80 z-50 bg-gray-100 dark:bg-gray-900 h-screen top-0 p-12 drop-shadow-md`}
        >
            <span className={"font-mono text-lg font-bold "}>Prompts</span>
            {Object.keys(categoryObj).map((key) => (
                <div
                    key={key}
                    className='font-mono text-base hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'
                    onClick={() => props.chosenPrompt(categoryObj[key])}
                >
                    <span>{key}</span>
                </div>
            ))}
        </div>
    );
};
