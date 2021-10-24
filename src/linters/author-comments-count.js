module.exports = (core, pr, rawMinComments) => {
  const minCommentsCount = parseInt(rawMinComments, 10);

  if (pr.authorCommentsCount >= minCommentsCount) {
    core.info("Your PR description has enough comments.");
  } else {
    core.setFailed("Your PR needs more comments!");
  }
};
