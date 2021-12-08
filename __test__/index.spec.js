const request = require("supertest");
const server = require("../server");

describe("GET route from api/ping", () => {
  test("should send back status 200 to client", async () => {
    const res = await request(server).get("/api/ping");
    expect(res.status).toBe(200);
  });

  test("should send success status to client", async () => {
    const res = await request(server).get("/api/ping");
    const successResponse = { success: true }
    expect(res.body).toStrictEqual(successResponse);
  });
});

describe("GET route from api/posts", () => {
  test("should test if tags exists in parameters.", async () => {
    const res = await request(server).get("/api/posts");
    expect(res.status).toBe(400);
    const errorResponse = { error: "tags parameter is required!" }
    expect(res.body).toStrictEqual(
      errorResponse
    );
  });

  test("should check for if tags is empty", async () => {
    const res = await request(server).get("/api/posts?tags=");
    expect(res.status).toBe(400);
    const errorResponse = { error: "tags parameter is required!" }
    expect(res.body).toStrictEqual(
      errorResponse
    );
  });

  test("should check for invalid query in sortBy", async () => {
    const res = await request(server).get("/api/posts?tags=tech&sortBy=books");
    expect(res.status).toBe(400);
    const errorResponse = { error: "sortBy parameter is invalid" }
    expect(res.body).toStrictEqual(
      errorResponse
    );
  });

  test("should check for invalid query in directions", async () => {
    const res = await request(server).get("/api/posts?tags=tech&direction=up");
    expect(res.status).toBe(400);
    const errorResponse = { error: "direction parameter is invalid" }
    expect(res.body).toStrictEqual(
      errorResponse
    );
  });
  
  test("should check for valid parameters in sortBy", async () => {
    const res = await request(server).get(`/api/posts?&tags=tech&sortBy=likes`);
      expect(res.status).toBe(200)
  });

  test("should check for valid parameters in direction", async () => {
    const res = await request(server).get(`/api/posts?&tags=tech&direction=desc`);
      expect(res.status).toBe(200)
  });

});
