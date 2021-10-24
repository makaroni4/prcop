module.exports = async (octokit, pr, configFilePath) => {
  const [owner, repo] = pr.repoFullName.split("/");

  const response = await octokit.repos.getContent({
    owner: owner,
    repo: repo,
    path: configFilePath
  });

  const rawConfig = Buffer.from(response.data.content, response.data.encoding).toString();

  return JSON.parse(rawConfig);
};
