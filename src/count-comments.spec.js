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

    const pr = {
      number: "123",
      authorLogin: "makaroni4",
      repoFullName: "makaroni4/prcop"
    };

    expect(countComments(octokit, pr)).resolves.toBe(1);
  });
});
