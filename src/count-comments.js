module.exports = async (octokit, prNumber, authorLogin, repoFullName) => {
  // PR number is in URL like 4821 https://github.com/foo/bar/pull/4821
  const response = await octokit.request(`GET /repos/${repoFullName}/pulls/${prNumber}/comments`);

  const authorComments = response.data.filter(comment => {
    return comment.user.login === authorLogin;
  });

  return authorComments.length;
};
