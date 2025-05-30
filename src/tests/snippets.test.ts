import app from "../routes/app";
import request from "supertest";
import * as aiService from "../services/ai";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_uri = process.env.MONGODB_URI_TEST;

const _mockedLargeText = `This is the large text that I am using to test the ability of the api to generate my snippet. 
        At this point I should have been using some Lorem Ipsum from internet or a library that generates random texts from an specific size,
        but it is fine for now`;

const _mockedSnippet = "This is the summarized mocked snippet, enjoy!";

beforeAll(async () => {

    await mongoose.connect(mongo_uri || '');

    jest.spyOn(aiService, "getSnippetFromText").mockImplementation(
        async () => _mockedSnippet
    );
});

afterAll(async () => {
    await mongoose.disconnect();
    jest.resetAllMocks();
});

beforeEach(async () => {
    await mongoose?.connection?.db?.dropDatabase();
});

describe("POST /snippets", () => {
    it("should return a valid summary for valid text", async () => {
        const largePayloadText = _mockedLargeText;
        const response = await request(app)
            .post("/snippets")
            .send({ text: largePayloadText })
            .expect(201);

        expect(response.body).toHaveProperty("_id");
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
            .get(`/snippets/${newSnippet._id}`)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                _id: newSnippet._id,
                text: newSnippet.text,
                summary: newSnippet.summary,
            })
        );
    });

    it("should return 404 for a non-existing snippet id", async () => {
        await request(app)
            .get(`/snippets/68391f300000000000000000`)
            .expect(404);
    });

    it("should return 400 for an invalid object id id", async () => {
        await request(app).get(`/snippets/1234blah5678`).expect(400);
    });
});
