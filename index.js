const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/action");
const octokit = new Octokit();
const lint = require("./src/lint");

lint(core, github, octokit);
