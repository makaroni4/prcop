const disableWordPresent = require("../../src/linters/disable-word");

describe("disableWordPresent", () => {
  describe("when PR title contains disable word", () => {
    it("returns true", () => {
      const pr = {
        title: "Update dependandices prcop:disable",
        description: null
      };

      const core = {
        info: jest.fn()
      };

      expect(disableWordPresent(core, pr, "prcop:disable")).toBe(true);
      expect(core.info).toHaveBeenCalledWith("prcop is disabled for that PR.");
    });
  });

  describe("when PR description contains disable word", () => {
    it("returns true", () => {
      const pr = {
        title: "Update dependandices",
        description: "prcop:disable"
      };

      const core = {
        info: jest.fn()
      };

      expect(disableWordPresent(core, pr, "prcop:disable")).toBe(true);
      expect(core.info).toHaveBeenCalledWith("prcop is disabled for that PR.");
    });
  });

  describe("when PR title and description don't contain disable word", () => {
    it("returns false", () => {
      const pr = {
        title: "Update dependandices",
        description: null
      };

      const core = {
        info: jest.fn()
      };

      expect(disableWordPresent(core, pr, "prcop:disable")).toBe(false);
      expect(core.info).not.toHaveBeenCalled();
    });
  });
});
