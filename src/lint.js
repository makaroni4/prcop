const countComments = require("./count-comments");
const disableWordPresent = require("./linters/disable-word");
const lintTitle = require("./linters/title-regexp");
const lintDescription = require("./linters/description-regexp");
const checkDescriptionMinWords = require("./linters/description-min-words");
const checkAuthorCommentsCount = require("./linters/author-comments-count");

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

    const disableWord = core.getInput("disable-word") || "prcop:disable";
    if(disableWordPresent(core, pr, disableWord)) {
      return;
    }

    const rawTitleRegexp = core.getInput("title-regexp");
    const titleErrorMessage = core.getInput("title-format-error-message");
    lintTitle(core, pr, rawTitleRegexp, titleErrorMessage);

    const rawDescriptionRegexp = core.getInput("description-regexp");
    const descriptionErrorMessage = core.getInput("description-format-error-message");
    lintDescription(core, pr, rawDescriptionRegexp, descriptionErrorMessage);

    const rawDescriptionMinWords = core.getInput("description-min-words") || 0;
    checkDescriptionMinWords(core, pr, rawDescriptionMinWords);

    const rawMinCommentsCount = core.getInput("min-comments") || 0;
    checkAuthorCommentsCount(core, pr, rawMinCommentsCount);
  } catch (error) {
    core.setFailed(error.message);
    core.setFailed(error.stack);
  }
};

module.exports = lint;
