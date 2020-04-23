import { TestingHelper, ResponseTest } from "../testing.helper";
import "../constants";
import { BASE_URL, USERS } from "../constants";

describe("Register", () => {
  let jwtToken = "";

  beforeAll(async () => {
    const userCreationResponse: ResponseTest = await TestingHelper.makeRequest(
      BASE_URL,
      "register",
      "POST",
      {},
      USERS.SIMPLE
    );
    if (userCreationResponse.body != "OK") {
      console.log("User DATA was not created");
    }

    const userLoginResponse = await TestingHelper.makeRequest(
      BASE_URL,
      "login",
      "POST",
      {},
      USERS.SIMPLE
    );
    if (userLoginResponse.responseStatus > 201) {
      console.log("User DATA login error");
    }
    jwtToken = userLoginResponse.body;
  });

  afterAll(async () => {
    const response: ResponseTest = await TestingHelper.makeRequest(
      BASE_URL,
      "profile",
      "DELETE",
      { Authorization: jwtToken }
    );
    if (response.body != "OK") {
      console.log("User DATA was not deleted");
    }
  });

  it("invalid email", async () => {
    const response: ResponseTest = await TestingHelper.makeRequest(
      BASE_URL,
      "register",
      "POST",
      {},
      { email: "qwe@qwe@gmail.com", password: USERS.SIMPLE.password }
    );
    expect(response.responseStatus).toBe(400);
  });

  it("not enough fields", async () => {
    const response: ResponseTest = await TestingHelper.makeRequest(
      BASE_URL,
      "register",
      "POST",
      {},
      { password: USERS.SIMPLE.password }
    );
    expect(response.responseStatus).toBe(400);
  });

  it("already registered", async () => {
    const response: ResponseTest = await TestingHelper.makeRequest(
      BASE_URL,
      "register",
      "POST",
      {},
      USERS.SIMPLE
    );
    expect(response.responseStatus).toBe(400);
  });

  it("success", async () => {
    const email = "maks.valid123@gmail.com";
    const password = USERS.SIMPLE.password;
    const data = { email, password };

    const userCreationResponse: ResponseTest = await TestingHelper.makeRequest(
      BASE_URL,
      "register",
      "POST",
      {},
      data
    );
    expect(userCreationResponse.body).toEqual("OK");

    const userLoginResponse = await TestingHelper.makeRequest(
      BASE_URL,
      "login",
      "POST",
      {},
      data
    );
    expect(userLoginResponse.responseStatus).toEqual(200);

    const userDeleteResponse = await TestingHelper.makeRequest(
      BASE_URL,
      "profile",
      "DELETE",
      { Authorization: userLoginResponse.body }
    );
    expect(userDeleteResponse.responseStatus).toEqual(200);
  });

  it("invalid credentials", async () => {
    const response: ResponseTest = await TestingHelper.makeRequest(
        BASE_URL,
        "login",
        "POST",
        {},
        {email: USERS.SIMPLE.email, password: "jibber_jabber" }
    );
    expect(response.responseStatus).toBe(400);
  });
});
