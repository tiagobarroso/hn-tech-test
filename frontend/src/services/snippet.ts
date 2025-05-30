export const getSummary = (text: string) => {
    return fetch("http://localhost:3000/snippets", {
        body: JSON.stringify({ text }),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
