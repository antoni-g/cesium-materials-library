const client = null;
const logger = require('../util/logger').getLogger('materialsDAO')

// in memory representation of a db
const materialsRes = new Map();

const adminRole = 'admin';

function queryForAllMaterials(userRole) {
  logger.debug(`queryForAllMaterials { ${JSON.stringify(userRole)} }`)
  res = Array.from(materialsRes.values());
  if (userRole !== 'admin') {
    res.filter(material => !material.protected)
  }
  for (mat in res) {
    delete[mat['role']]
  }
  logger.debug(`queryForAllMaterials - ${JSON.stringify(res)}`)
  return res;
}

function materialExists(userRole, material) {
  logger.debug(`materialExists { ${JSON.stringify(material)} }`)
  res = materialsRes.has(material['name']);
  logger.debug(`materialExists - ${JSON.stringify(res)}`)
  return res;
}

function upsertMaterial(userRole, material) {
  if (userRole === undefined || material === undefined) {
    throw Error('IllegalArgumentException')
  }
  if (materialExists(userRole, material)) {
    updateMaterial(material);
    return {update : true, result : updateMaterial(material)};
  } else {
    return {update : false, result : addMaterial(material)};
  }
}

function addMaterial(material) {
  logger.debug(`addMaterial { ${JSON.stringify(material)} }`)
  materialsRes.set(material['name'], material);
  return material;
}

function updateMaterial(material) {
  logger.debug(`updateMaterial { ${JSON.stringify(material)} }`)
  let tgt = materialsRes.get(material['name']);
  tgt['color'] = material['color'];
  tgt['deliveryDate'] = material['deliveryDate'];
  tgt['volume'] = material['volume'];
  tgt['cost'] = material['cost'];
  materialsRes.set(material['name'], tgt);
  return tgt;
}

function deleteMaterial(name) {
  logger.debug(`updateMaterial { ${name} }`)
  if (name === undefined) {
    throw Error('IllegalArgumentException')
  }
  return materialsRes.delete(name);
}

module.exports = {
  queryForAllMaterials: queryForAllMaterials,
  upsertMaterial : upsertMaterial,
  deleteMaterial: deleteMaterial
}