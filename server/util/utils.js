function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

function isFloat(mixedVar) {
  return typeof mixedVar === 'number'
}

module.exports = {
  isEmptyObject: isEmptyObject,
  isFloat : isFloat
}