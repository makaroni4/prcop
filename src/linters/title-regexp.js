module.exports = (core, pr, config) => {
  const regexp = new RegExp(config.regexp);
  const isValid = regexp.test(pr.title);

  if (isValid) {
    core.info("Your PR title is perfect!");
  } else {
    core.setFailed(config.errorMessage);
  }

  return isValid;
};
