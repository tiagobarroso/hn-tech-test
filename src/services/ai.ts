import dotenv from 'dotenv';
dotenv.config();

const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getSnippetFromText = async (text: string) => {
    return await apiFetch(text);
};

const apiFetch = async (text: string) => {
    const prompt = `Summarize the following text in less than 30 words:\n\n${text}`;

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 128,
        temperature: 0.5,
    });
    return completion.choices[0].message.content.trim();
};
