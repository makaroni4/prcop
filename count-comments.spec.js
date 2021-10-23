const countComments = require("./count-comments");

describe("countComments", () => {
  test("counts author comments on PR", () => {
    const octokit = {
      request() {
        return {
          data: [
            { user: { login: "makaroni4" } },
            { user: { login: "foobar" } },
          ]
        };
      }
    }

    expect(countComments(octokit, "123", "makaroni4", "makaroni4/prcop")).resolves.toBe(1);
  });
})
