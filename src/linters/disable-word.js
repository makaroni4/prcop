module.exports = (core, pr, disableWord) => {
  const isDisabled = pr.title.includes(disableWord) || pr.description.includes(disableWord);

  if(isDisabled) {
    core.info("prcop is disabled for that PR.");
  }

  return isDisabled;
};
