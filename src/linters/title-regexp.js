module.exports = (core, pr, config) => {
  const regexp = new RegExp(config.regexp);

  if (regexp.test(pr.title)) {
    core.info("Your PR title is perfect!");
  } else {
    core.setFailed(config.errorMessage);
  }
};
