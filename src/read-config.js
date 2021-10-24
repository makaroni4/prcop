module.exports = async (octokit, pr, configFilePath) => {
  const [owner, repo] = pr.repoFullName.split("/");

  console.log(owner, repo, configFilePath);

  const response = await octokit.repos.getContent({
    owner: owner,
    repo: repo,
    path: configFilePath
  });

  return Buffer.from(response.data.content, response.data.encoding).toString();
};
