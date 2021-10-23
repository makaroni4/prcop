const countComments = require("./countComments");

const lint = async (core, github, octokit) => {
  try {
    const prTitle = github.context.payload.pull_request.title;
    const prDescription = github.context.payload.pull_request.body;
    const repoFullName = github.context.repository.full_name;

    // Check for disable word
    const disableWord = core.getInput("disable-word");

    if(prTitle.includes(disableWord) || prDescription.includes(disableWord)) {
      core.info("prcop is disabled for that PR.");

      return;
    }

    // Check PR title
    const rawTitleRegexp = core.getInput("title-regexp");

    if(rawTitleRegexp) {
      const titleErrorMessage = core.getInput("title-format-error-message");

      const titleRegexp = new RegExp(rawTitleRegexp);

      if (titleRegexp.test(prTitle)) {
        core.info("Your PR title is perfect!");
      } else {
        core.setFailed(titleErrorMessage);
      }
    }

    // Check PR description
    const rawDescriptionRegexp = core.getInput("description-regexp");

    if(rawDescriptionRegexp) {
      const descriptionErrorMessage = core.getInput("description-format-error-message");

      const desriptionRegexp = new RegExp(rawDescriptionRegexp);

      if (desriptionRegexp.test(prDescription)) {
        core.info("Your PR description is perfect!");
      } else {
        core.setFailed(descriptionErrorMessage);
      }
    }

    // Check PR description length
    const rawDescriptionMinWords = core.getInput("description-min-words") || 0;

    if(rawDescriptionMinWords) {
      const descriptionMinWords = parseInt(rawDescriptionMinWords, 10);
      const descriptionWordsCount = prDescription.split(" ").length;

      if (descriptionWordsCount > descriptionMinWords) {
        core.info("Your PR description is long enough!");
      } else {
        core.setFailed("Your PR description is too short.");
      }
    }

    // Count author comments
    const rawMinComments = core.getInput("min-comments") || 0;

    if(rawMinComments) {
      const minCommentsCount = parseInt(rawMinComments, 10);
      const authorLogin = github.context.payload.pull_request.user.login;

      // PR number is in URL like 4821 https://github.com/foo/bar/pull/4821
      const prId = github.context.payload.pull_request.number;
      const commentsCount = await countComments(octokit, prId, authorLogin);

      if (commentsCount >= minCommentsCount) {
        core.info("Your PR description has enough comments.");
      } else {
        core.setFailed("Your PR needs more comments!");
      }
    }
  } catch (error) {
    core.setFailed(error.message);
    core.setFailed(error.stack);
  }
};

module.exports = lint;
