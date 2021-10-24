const countComments = require("./count-comments");

module.exports = async (octokit, github) => {
  const pr = {
    title: github.context.payload.pull_request.title,
    description: github.context.payload.pull_request.body || "",
    repoFullName: github.context.payload.repository.full_name,
    number: github.context.payload.pull_request.number,
    authorLogin: github.context.payload.pull_request.user.login
  };

  pr.authorCommentsCount = await countComments(octokit, pr);

  return pr;
};
