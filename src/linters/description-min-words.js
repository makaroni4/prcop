module.exports = (core, pr, rawDescriptionMinWords) => {
  const descriptionMinWords = parseInt(rawDescriptionMinWords, 10);
  const descriptionWordsCount = prDescription.split(" ").length;

  if (descriptionWordsCount > descriptionMinWords) {
    core.info("Your PR description is long enough!");
  } else {
    core.setFailed("Your PR description is too short.");
  }
};
