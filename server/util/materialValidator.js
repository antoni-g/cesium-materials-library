const stringUtils = require("underscore.string");
const utils = require('../util/utils')
const logger = require('../util/logger').getLogger('materialValidator')

function validateMaterial(material) {
  logger.debug(`materialValidator - validateMaterial { ${JSON.stringify(material)} }`)
  let res = {};
  res.validationErrors = {};
  errorMsg = '';
  if (material === undefined) {
    errorMsg += 'no body was passed in the request. ';
  }
  if (stringUtils.isBlank(material['name'])) {
    res.validationErrors['name'] = false;
    errorMsg += 'name cannot be blank. ';
  }
  if (stringUtils.isBlank(material['color'])) {
    res.validationErrors['color'] = false;
    errorMsg += 'color cannot be blank. ';
  }
  if (stringUtils.isBlank(material['deliveryDate'])) {
    res.validationErrors['deliveryDate'] = false;
    errorMsg += 'deliveryDate cannot be blank. ';
  } 
  if (material['volume'] < 0) {
    res.validationErrors['volume'] = false;
    errorMsg += 'volume must be 0 or greater. ';
  }
  if (!utils.isFloat(material['volume'])) {
    res.validationErrors['volume'] = false;
    errorMsg += 'volume must be a float. ';
  }
  if (material['cost'] < 0) {
    res.validationErrors['cost'] = false;
    console.log("hello")
    errorMsg += 'cost must be 0 or greater. ';
    console.log(errorMsg)
  }
  if (!utils.isFloat(material['cost'])) {
    res.validationErrors['cost'] = false;
    errorMsg += 'cost must be a float. ';
    console.log(errorMsg)
  }
  if (!validateColor(material['color'])) {
    res.validationErrors['color'] = false;
    errorMsg += 'color must be in hex format.';
  }
  if (!validateDate(material['deliveryDate'])) {
    res.validationErrors['deliveryDate'] = false;
    errorMsg += 'deliveryDate must be in javascript date format.';
  }
  if (!stringUtils.isBlank(errorMsg)) {
    res.error = errorMsg;
  }
  logger.debug(`materialValidator - validateMaterial - ${JSON.stringify(res)}`)
  return res;
}

function validateColor(color) {
  return /^#[0-9a-fA-F]{6}$/gm.test(color);
}

function validateDate(date) {
  return /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/gm.test(date)
}

module.exports = {
  validateMaterial : validateMaterial
}