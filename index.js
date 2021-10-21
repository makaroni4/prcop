const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/action");

try {
  const octokit = new Octokit();
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

  console.log("--> Owner: ", owner);
  console.log("--> Repo: ", repo);

  const prTitle = github.context.payload.pull_request.title;

  console.log("--> PR title: ", prTitle);
  console.log(`--> PR title: ${prTitle}`);
  console.log("--> PR title: ", prTitle.trim());

  const titleRegexp = core.getInput("title-regexp");
  const titleErrorMessage = core.getInput("title-format-error-message");

  console.log(`--> titleRegexp: '${titleRegexp}'`);
  console.log(`--> titleRegexp: '${titleRegexp.trim()}'`);

  console.log("--> titleErrorMessage: ", titleErrorMessage);

  const regexp = new RegExp(titleRegexp.trim());

  if (regexp.test(prTitle.trim())) {
    core.info("Your PR title is perfect!");
  } else {
    core.setFailed(titleErrorMessage);
  }
} catch (error) {
  core.setFailed(error.message);
}
