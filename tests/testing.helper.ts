const request = require('request');

export class ResponseTest {
  responseStatus: number = 0;
  body: any;
}

export class TestingHelper {
  public static async makeRequest(baseUrl: string, url: string, method: string, headers: any = {}, json: any={}): Promise<ResponseTest> {
    return new Promise(((resolve, reject) => {
      request({
        uri: `${baseUrl}/${url}`,
        method,
        json,
        headers
      }, (error:any, response:any, body: any) => {
        if (error){
          reject("Something went wrong");
        }
        const resp = new ResponseTest();
        resp.responseStatus = response.statusCode;
        resp.body = body;
        return resolve(resp);
      });
    }));
  }
}
