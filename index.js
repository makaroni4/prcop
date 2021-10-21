const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/action");

try {
  const octokit = new Octokit();
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

  console.log("--> Owner: ", owner);
  console.log("--> Repo: ", repo);

  // Check PR title
  const prTitle = github.context.payload.pull_request.title;

  const titleRegexp = core.getInput("title-regexp");

  if(titleRegexp) {
    const titleErrorMessage = core.getInput("title-format-error-message");

    const titleRegexp = new RegExp(titleRegexp);

    if (titleRegexp.test(prTitle)) {
      core.info("Your PR title is perfect!");
    } else {
      core.setFailed(titleErrorMessage);
    }
  }

  // Check PR description
  const prDescription = github.context.payload.pull_request.body;

  const descriptionRegexp = core.getInput("description-regexp");

  if(descriptionRegexp) {
    const descriptionErrorMessage = core.getInput("description-format-error-message");

    const desriptionRegexp = new RegExp(titleRegexp);

    if (desriptionRegexp.test(prDescription)) {
      core.info("Your PR description is perfect!");
    } else {
      core.setFailed(descriptionErrorMessage);
    }
  }

  // Check PR description length
  const descriptionMinWords = core.getInput("description-min-words") || 0;

  if(descriptionMinWords) {
    const descriptionWordsCount = prDescription.split(" ").length;

    if (descriptionWordsCount > descriptionMinWords) {
      core.info("Your PR description is long enough!");
    } else {
      core.setFailed("Your PR description is too short.");
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
