const request = require("supertest");
const server = require("../server");

describe("GET route from api/ping", () => {
  // send 200 status to client
  test("should send back status 200 to client", async () => {
    const res = await request(server).get("/api/ping");
    expect(res.status).toBe(200);
  });

  // Send success status to client
  test("should send success status to client", async () => {
    const res = await request(server).get("/api/ping");
    expect(JSON.stringify(res.body)).toBe('{"success":true}');
  });

  //404 for invalid params
  test("should throw 404 error for invalid paramaters", async () => {
    const res = await request(server).get("/api/pings");
    expect(res.status).toBe(404);
  });
});

describe("GET route from api/posts", () => {
  // check for tags parameter being required
  test("should test if tags exists in parameters.", async () => {
    const res = await request(server).get("/api/posts");
    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).toBe(
      '{"error":"tags parameter is required!"}'
    );
  });

  // check for empty tags in tags parameter
  test("should check for if tags is empty", async () => {
    const res = await request(server).get("/api/posts?tags=");
    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).toBe(
      '{"error":"tags parameter is required!"}'
    );
  });

  // invalid sortby params
  test("should check for invalid query in sortBy", async () => {
    const res = await request(server).get("/api/posts?tags=tech&sortBy=books");
    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).toBe(
      '{"error":"sortBy parameter is invalid"}'
    );
  });

  // invalid direction params
  test("should check for invalid query in directions", async () => {
    const res = await request(server).get("/api/posts?tags=tech&direction=up");
    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).toBe(
      '{"error":"direction parameter is invalid"}'
    );
  });
  
  //valid parameters for sortBy
  test("should check for valid parameters in sortBy", async () => {
    const sortValues = ['id', 'reads', 'likes', 'popularity'];
    const res = await request(server).get(`/api/posts?&tags=tech&sortBy=${sortValues[Math.floor(Math.random() * sortValues.length)]}`);
      expect(res.status).toBe(200)
  });

  //valid parameters for directions
  test("should check for valid parameters in direction", async () => {
    const directionValues = ['asc', 'desc'];
    const res = await request(server).get(`/api/posts?&tags=tech&direction=${directionValues[Math.floor(Math.random() * directionValues.length)]}`);
      expect(res.status).toBe(200)
  });

});
