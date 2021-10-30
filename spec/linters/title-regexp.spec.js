const lintTitle = require("../../src/linters/title-regexp");

describe("Linter: PR's title RegExp", () => {
  const core = {
    info: jest.fn(),
    setFailed: jest.fn()
  };

  const config = {
    regexp: "^CK-[0-9]+",
    errorMessage: "PR title must start with a Jira ticket ID."
  };

  beforeEach(() => {
    core.info.mockReset();
    core.setFailed.mockReset();
  });

  describe("when PR title matches config's regexp", () => {
    it("returns true", () => {
      const pr = {
        title: "CK-1249 Update dependencies"
      };

      expect(lintTitle(core, pr, config)).toBe(true);
      expect(core.info).toHaveBeenCalledWith("Your PR title is perfect!");
    });
  });

  describe("when PR title does not match config's regexp", () => {
    it("returns false", () => {
      const pr = {
        title: "Update dependencies"
      };

      expect(lintTitle(core, pr, config)).toBe(false);
      expect(core.setFailed).toHaveBeenCalledWith("PR title must start with a Jira ticket ID.");
    });
  });
});
