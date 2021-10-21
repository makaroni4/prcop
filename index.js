const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/action");

try {
  const octokit = new Octokit();
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

  console.lo("--> Owner: ", owner);
  console.lo("--> Repo: ", repo);

  const prTitle = github.context.payload.pull_request.title;

  console.log("--> PR title: ", prTitle);

  const titleRegexp = core.getInput("title-regexp");
  const titleErrorMessage = core.getInput("title-format-error-message");

  console.lo("--> titleRegexp: ", titleRegexp);
  console.lo("--> titleErrorMessage: ", titleErrorMessage);

  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
