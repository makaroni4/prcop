module.exports = (core, pr, config) => {
  const regexp = new RegExp(config.regexp);
  const isValid = regexp.test(pr.description);

  if (isValid) {
    core.info("Your PR description is perfect!");
  } else {
    core.setFailed(config.errorMessage);
  }

  return isValid;
};
