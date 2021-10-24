module.exports = async (octokit, prID, authorLogin, repoFullName) => {
  const response = await octokit.request(`GET /repos/${repoFullName}/pulls/${prID}/comments`);

  const authorComments = response.data.filter(comment => {
    return comment.user.login === authorLogin;
  });

  return authorComments.length;
};
