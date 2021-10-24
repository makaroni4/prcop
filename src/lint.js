const countComments = require("./count-comments");
const disableWordPresent = require("./linters/disable-word");
const lintTitle = require("./linters/title-regexp");
const lintDescription = require("./linters/description-regexp");
const checkDescriptionMinWords = require("./linters/description-min-words");
const checkAuthorCommentsCount = require("./linters/author-comments-count");
const readConfig = require("./read-config");

const lint = async (core, github, octokit) => {
  try {
    const pr = {
      title: github.context.payload.pull_request.title,
      description: github.context.payload.pull_request.body || "",
      repoFullName: github.context.payload.repository.full_name,
      number: github.context.payload.pull_request.number,
      authorLogin: github.context.payload.pull_request.user.login
    }

    pr.authorCommentsCount = await countComments(octokit, pr);

    const configFilePath = core.getInput("config-file");
    const config = await readConfig(octokit, pr, configFilePath);

    console.log(config);

    const disableWord = config.disableWord || "prcop:disable";
    if(disableWordPresent(core, pr, disableWord)) {
      return;
    }

    config.linters.forEach(linter => {
      switch(linter.name) {
        case "titleRegexp":
          lintTitle(core, pr, linter.config);
          break;
        case "descriptionRegexp":
          lintDescription(core, pr, linter.config);
          break;
        case "descriptionMinWords":
          checkDescriptionMinWords(core, pr, linter.config);
          break;
        case "minComments":
          checkAuthorCommentsCount(core, pr, linter.config);
          break;
      }
    })
  } catch (error) {
    core.setFailed(error.message);
    core.setFailed(error.stack);
  }
};

module.exports = lint;
