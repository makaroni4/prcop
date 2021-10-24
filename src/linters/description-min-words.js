module.exports = (core, pr, config) => {
  const descriptionMinWords = parseInt(config.minWordsCount, 10);
  const descriptionWordsCount = pr.description.split(" ").length;

  if (descriptionWordsCount > descriptionMinWords) {
    core.info("Your PR description is long enough!");
  } else {
    core.setFailed(config.errorMessage);
  }
};
