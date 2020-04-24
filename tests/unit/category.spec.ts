import { TestingHelper, ResponseTest } from "../testing.helper";
import "../constants";
import { BASE_URL, USERS } from "../constants";

describe("Category_access", () => {
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

    it("non authorized resource", async () => {
        const response: ResponseTest = await TestingHelper.makeRequest(
            BASE_URL,
            "categories/123451",
            "Get",
            { Authorization: jwtToken },
        );
        expect(response.body).toEqual('Category not found');
        expect(response.responseStatus).toBe(400);
    });


    it("positive budget", async () => {
        const response: ResponseTest = await TestingHelper.makeRequest(
            BASE_URL,
            "categories",
            "POST",
            { Authorization: jwtToken },
            {name: "sport",
                  budget: "100",
                  frequency: "DAILY"}
        );
        expect(response.responseStatus).toBe(200);
    });


    it("positive expanses", async () => {

        const response1: ResponseTest = await TestingHelper.makeRequest(
            BASE_URL,
            "categories",
            "POST",
            { Authorization: jwtToken },
            {name: "sport",
                budget: "100",
                frequency: "DAILY"}
        );
        expect(response1.responseStatus).toBe(200);
        let cat_id = response1.body.id;

        const response: ResponseTest = await TestingHelper.makeRequest(
            BASE_URL,
            "categories/"+cat_id.toString()+"/expenses",
            "POST",
            { Authorization: jwtToken },
            {sum: "50"}
        );
        expect(response.responseStatus).toBe(200);
    });

    it("positive income", async () => {
        const response: ResponseTest = await TestingHelper.makeRequest(
            BASE_URL,
            "profile",
            "PUT",
            { Authorization: jwtToken },
            {addSum: "1000"}
        );
        expect(response.responseStatus).toBe(200);
    });


    it("filter journal", async () => {

        const response1: ResponseTest = await TestingHelper.makeRequest(
            BASE_URL,
            "categories",
            "POST",
            { Authorization: jwtToken },
            {name: "music",
                budget: "200",
                frequency: "MONTHLY"}
        );
        expect(response1.responseStatus).toBe(200);
        let cat_id = response1.body.id;


        const response0: ResponseTest = await TestingHelper.makeRequest(
            BASE_URL,
            "categories",
            "POST",
            { Authorization: jwtToken },
            {name: "sport",
                budget: "200",
                frequency: "MONTHLY"}
        );
        expect(response0.responseStatus).toBe(200);

        const response2: ResponseTest = await TestingHelper.makeRequest(
            BASE_URL,
            "categories/"+cat_id.toString()+"/expenses",
            "POST",
            { Authorization: jwtToken },
            {sum: "10"}
        );
        expect(response2.responseStatus).toBe(200);

        const response3: ResponseTest = await TestingHelper.makeRequest(
            BASE_URL,
            "categories/"+cat_id.toString()+"/expenses",
            "POST",
            { Authorization: jwtToken },
            {sum: "50"}
        );
        expect(response3.responseStatus).toBe(200);


        const response4: ResponseTest = await TestingHelper.makeRequest(
            BASE_URL,
            "categories/"+cat_id.toString(),
            "Get",
            { Authorization: jwtToken },
        );
        expect(response4.responseStatus).toBe(200);
        expect(response4.body.name).toEqual("music");
        expect(parseInt(response4.body.currentExpenses)).toEqual(60);
    });



});
