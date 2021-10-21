const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/action");

const countComments = async (octokit, prID, authorLogin) => {
  console.log("--> countComments", prID, authorLogin);

  const response = await octokit.request(`GET /repos/blinkist/blinkist-web/pulls/${prID}/comments`, {
    org: "blinkist",
    type: "private"
  });

  const authorComments = response.data.filter(comment => {
    return comment.user.login === authorLogin;
  });

  return authorComments.length;
};

const lint = async () => {
  try {
    const octokit = new Octokit();
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

    console.log("--> Owner: ", owner);
    console.log("--> Repo: ", repo);

    // Check PR title
    const prTitle = github.context.payload.pull_request.title;

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
    const prDescription = github.context.payload.pull_request.body;

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
      console.log("--> minCommentsCount: ", minCommentsCount);
      console.log("--> PR: ", github.context.payload.pull_request);

      const authorLogin = github.context.payload.pull_request.user.login;
      const prId = github.context.payload.pull_request.id;
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

lint();
