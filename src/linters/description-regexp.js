module.exports = (core, pr, config) => {
  const regexp = new RegExp(config.regexp);

  if (regexp.test(pr.description)) {
    core.info("Your PR description is perfect!");
  } else {
    core.setFailed(config.errorMessage);
  }
};
