module.exports = (core, pr, disableWord) => {
  const isDisabled =  (pr.title && pr.title.includes(disableWord)) ||
    (pr.description && pr.description.includes(disableWord));

  if (isDisabled) {
    core.info("prcop is disabled for that PR.");
  }

  return !!isDisabled;
};
