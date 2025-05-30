
import { Snippet } from "../models/snippet";
import { getSnippetFromText } from "./ai";

/**
 * Creates a new snippet
 * 
 * @param text 
 * @returns 
 */
export const create = async (text: string) => {

    // take the summary from AI
    const summary = await getSnippetFromText(text);

    // persist
    const snippet = await Snippet.create({ text, summary});

    return snippet;
}

/**
 * Retrieves a new snippet by id
 * 
 * @param id 
 * @returns 
 */
export const getById = (id: string) => {
    return Snippet.findById(id);
}