const checkDescriptionMinWords = require("../../src/linters/description-min-words");

describe("Linter: min number of words in PR's description", () => {
  const core = {
    info: jest.fn(),
    setFailed: jest.fn()
  };

  const config = {
    minWordsCount: 5,
    errorMessage: "Please, write a meaningful PR description."
  };

  beforeEach(() => {
    core.info.mockReset();
    core.setFailed.mockReset();
  });

  describe("when PR description is too short", () => {
    it("returns true", () => {
      const pr = {
        title: "Update dependencies",
        description: "I've ran a full update of all our JS dependencies."
      };

      expect(checkDescriptionMinWords(core, pr, config)).toBe(true);
      expect(core.info).toHaveBeenCalledWith("Your PR description is long enough!");
    });
  });

  describe("when PR description contains disable word", () => {
    it("returns true", () => {
      const pr = {
        title: "Update dependencies",
        description: "TODO"
      };

      expect(checkDescriptionMinWords(core, pr, config)).toBe(false);
      expect(core.setFailed).toHaveBeenCalledWith("Please, write a meaningful PR description.");
    });
  });
});
