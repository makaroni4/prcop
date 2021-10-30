const checkAuthorCommentsCount = require("../../src/linters/author-comments-count");

describe("Author minimum comments linter", () => {
  const core = {
    info: jest.fn(),
    setFailed: jest.fn()
  };

  const config = {
    minCommentsCount: 5,
    errorMessage: "Please, comment on your code."
  };

  beforeEach(() => {
    core.info.mockReset();
    core.setFailed.mockReset();
  });

  describe("when PR does not have enough author comments", () => {
    it("returns false", () => {
      const pr = {
        title: "Update dependencies",
        authorCommentsCount: 2
      };

      expect(checkAuthorCommentsCount(core, pr, config)).toBe(false);
      expect(core.setFailed).toHaveBeenCalledWith("Please, comment on your code.");
    });
  });

  describe("when PR has enough author comments", () => {
    it("returns true", () => {
      const pr = {
        title: "Update dependencies",
        authorCommentsCount: 5
      };

      expect(checkAuthorCommentsCount(core, pr, config)).toBe(true);
      expect(core.info).toHaveBeenCalledWith("Your PR description has enough comments.");
    });
  });
});
