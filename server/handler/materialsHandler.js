const dao = require('../dao/materialsDAO')
const validator = require('../util/materialValidator')
const logger = require('../util/logger').getLogger('materialsHandler')
const utils = require('../util/utils')

function getLibraryOfMaterials(userRole) {
  logger.debug(`getLibraryOfMaterials { ${userRole} }`)
  res = {}
  try {
    results = dao.queryForAllMaterials(userRole);
    res['results'] = results;
  } catch (err) {
    logger.error(`getLibraryOfMaterials - ${err}`)
    res['error'] = `error accessing db to getLibraryOfMaterials: ${err.message}`;
  }
  logger.debug(`getLibraryOfMaterials - ${JSON.stringify(res)}`)
  return res;
}

function upsertMaterial(userRole, req) {
  logger.debug(`addMaterial { ${JSON.stringify(req)} }`)
  let material = req.material;
  let res = {}
  validation = validator.validateMaterial(material);
  if (!utils.isEmptyObject(validation.validationErrors)) {
    res.error = validation.error;
    res.validationErrors = validation.validationErrors;
  } else {
    determineMaterialAccess(material, req.protected, userRole);
    try {
      res = dao.upsertMaterial(userRole, material);
    } catch (err) {
      logger.error(`addMaterial - ${err}`)
      res.error = `error accessing db to addMaterial: ${err.message}`;
    }
  }
  logger.debug(`addMaterial - ${JSON.stringify(res)}`)
  return res;
}

function deleteMaterial(userRole, req) {
  logger.debug(`deleteMaterial { ${JSON.stringify(req)} }`)
  let material = req.name;
  let res = {}
  try {
    if (!dao.deleteMaterial(req.name)) {
      res.error('unable to delete item');
    }
  } catch (err) {
    logger.error(`deleteMaterial - ${err}`)
    res.error = `error accessing db to deleteMaterial: ${err.message}`;
  }
  logger.debug(`deleteMaterial { ${JSON.stringify(req)} }`)
  return res;
}

function determineMaterialAccess(material, protected, userRole) {
  if (userRole === 'admin' && protected) {
    material.protected = protected;
  }
}

module.exports = {
  getLibraryOfMaterials: getLibraryOfMaterials,
  upsertMaterial : upsertMaterial,
  deleteMaterial : deleteMaterial
}