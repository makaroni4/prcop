module.exports = (core, pr, rawDescriptionRegexp, errorMessage) => {
  if(!rawDescriptionRegexp) {
    return;
  }

  const regexp = new RegExp(rawDescriptionRegexp);

  if (regexp.test(pr.description)) {
    core.info("Your PR description is perfect!");
  } else {
    core.setFailed(errorMessage);
  }
};
