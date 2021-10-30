const disableWordPresent = require("../../src/linters/disable-word");

describe("Disable PRcop if a disable word is present", () => {
  const core = {
    info: jest.fn(),
    setFailed: jest.fn()
  };

  beforeEach(() => {
    core.info.mockReset();
    core.setFailed.mockReset();
  });

  describe("when PR title contains disable word", () => {
    it("returns true", () => {
      const pr = {
        title: "Update dependencies prcop:disable",
        description: null
      };

      expect(disableWordPresent(core, pr, "prcop:disable")).toBe(true);
      expect(core.info).toHaveBeenCalledWith("prcop is disabled for that PR.");
    });
  });

  describe("when PR description contains disable word", () => {
    it("returns true", () => {
      const pr = {
        title: "Update dependencies",
        description: "prcop:disable"
      };

      expect(disableWordPresent(core, pr, "prcop:disable")).toBe(true);
      expect(core.info).toHaveBeenCalledWith("prcop is disabled for that PR.");
    });
  });

  describe("when PR title and description don't contain disable word", () => {
    it("returns false", () => {
      const pr = {
        title: "Update dependencies",
        description: null
      };

      expect(disableWordPresent(core, pr, "prcop:disable")).toBe(false);
      expect(core.info).not.toHaveBeenCalled();
    });
  });
});
