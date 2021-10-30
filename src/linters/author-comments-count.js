module.exports = (core, pr, config) => {
  const minCommentsCount = parseInt(config.minCommentsCount, 10);
  const isValid = pr.authorCommentsCount >= minCommentsCount;

  if (isValid) {
    core.info("Your PR description has enough comments.");
  } else {
    core.setFailed(config.errorMessage);
  }

  return isValid;
};
