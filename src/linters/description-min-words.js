module.exports = (core, pr, config) => {
  const descriptionMinWords = parseInt(config.minWordsCount, 10);
  const descriptionWordsCount = pr.description.split(" ").length;
  const isValid = descriptionWordsCount > descriptionMinWords;

  if (isValid) {
    core.info("Your PR description is long enough!");
  } else {
    core.setFailed(config.errorMessage);
  }

  return isValid;
};
