import app from "../routes/app";

describe("POST /snippets", () => {
    it("should return a summary for valid text", async () => {});

    it("should return 400 if text is missing", async () => {});
});

describe("GET /snippets/:id", () => {
    it("should return the snippet data for a valid id", async () => {});

    it("should return 404 for a non-existing snippet id", async () => {});
});
