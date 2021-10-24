module.exports = async (octokit, pr) => {
  // PR number is in URL like 4821 https://github.com/foo/bar/pull/4821
  const response = await octokit.request(`GET /repos/${pr.repoFullName}/pulls/${pr.number}/comments`);

  const authorComments = response.data.filter(comment => {
    return comment.user.login === pr.authorLogin;
  });

  return authorComments.length;
};
