module.exports = (core, pr, rawTitleRegexp, errorMessage) => {
  if(!rawTitleRegexp) {
    return;
  }

  const regexp = new RegExp(rawTitleRegexp);

  if (regexp.test(pr.title)) {
    core.info("Your PR title is perfect!");
  } else {
    core.setFailed(errorMessage);
  }
};
