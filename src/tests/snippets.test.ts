import app from "../routes/app";
import request from "supertest";
import * as aiService from "../services/ai";

const _mockedLargeText = `This is the large text that I am using to test the ability of the api to generate my snippet. 
        At this point I should have been using some Lorem Ipsum from internet or a library that generates random texts from an specific size,
        but it is fine for now`;

const _mockedSnippet = "This is the summarized mocked snippet, enjoy!";

beforeAll(() => {
    jest.spyOn(aiService, "getSnippetFromText").mockImplementation(
        async () => _mockedSnippet
    );
});

afterAll(() => {
    jest.resetAllMocks();
});

describe("POST /snippets", () => {
    it("should return a valid summary for valid text", async () => {
        const largePayloadText = _mockedLargeText;
        const response = await request(app)
            .post("/snippets")
            .send({ text: largePayloadText })
            .expect(201);

        expect(response.body).toHaveProperty("id");
        expect(response.body.text).toBe(largePayloadText);
        expect(response.body.summary).toBe(_mockedSnippet);
    });

    it("should return 400 if text is missing on payload", async () => {
        await request(app).post("/snippets").send({}).expect(400);
    });
});

const createSnippet = async (text: string) => {
    const response = await request(app)
        .post("/snippets")
        .send({ text })
        .expect(201);

    return response.body;
};

describe("GET /snippets/:id", () => {
    it("should return the snippet data for a valid id", async () => {
        // create a script
        const newSnippet = await createSnippet(_mockedLargeText);

        const response = await request(app)
            .get(`/snippets/${newSnippet.id}`)
            .expect(200);

        expect(response.body).toEqual({
            id: newSnippet.id,
            text: newSnippet.text,
            summary: _mockedSnippet,
        });
    });

    it("should return 404 for a non-existing snippet id", async () => {
        await request(app).get(`/snippets/123blah345`).expect(404);
    });
});
