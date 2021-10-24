module.exports = (core, pr, config) => {
  const minCommentsCount = parseInt(config.minCommentsCount, 10);

  if (pr.authorCommentsCount >= minCommentsCount) {
    core.info("Your PR description has enough comments.");
  } else {
    core.setFailed(config.errorMessage);
  }
};
