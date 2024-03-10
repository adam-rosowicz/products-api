import { expect } from "chai";
import "mocha";
import request from "supertest";

describe("/api/product integration", () => {
  it("test example", async () => {
    return request(await global.container.cradle.app)
      .get("/health")
      .expect(200)
  });
});
