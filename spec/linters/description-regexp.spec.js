const lintDescription = require("../../src/linters/description-regexp");

describe("Linter: PR's title RegExp", () => {
  const core = {
    info: jest.fn(),
    setFailed: jest.fn()
  };

  const config = {
    regexp: "^CK-[0-9]+",
    errorMessage: "PR description must contain a link to a Jira ticket."
  };

  beforeEach(() => {
    core.info.mockReset();
    core.setFailed.mockReset();
  });

  describe("when PR title matches config's regexp", () => {
    it("returns true", () => {
      const pr = {
        description: "CK-1249 Update dependencies"
      };

      expect(lintDescription(core, pr, config)).toBe(true);
      expect(core.info).toHaveBeenCalledWith("Your PR description is perfect!");
    });
  });

  describe("when PR title does not match config's regexp", () => {
    it("returns false", () => {
      const pr = {
        description: "Update dependencies"
      };

      expect(lintDescription(core, pr, config)).toBe(false);
      expect(core.setFailed).toHaveBeenCalledWith("PR description must contain a link to a Jira ticket.");
    });
  });
});
