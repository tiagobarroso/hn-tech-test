import { Schema, model } from "mongoose";

export interface ISnippet {
    text: string;
    summary: string;
}

const SnippetSchema = new Schema<ISnippet>({
    text: { type: String, required: true },
    summary: { type: String, required: true },
});

export const Snippet = model<ISnippet>("Snippet", SnippetSchema);