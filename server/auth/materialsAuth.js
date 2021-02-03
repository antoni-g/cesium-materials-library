const utils = require('./authUtils')

function authenticateToken(token) {
  return utils.verifyToken(token);
}

function determineUserRole(token) {
  return 'admin'
}

function alloowedWriteOp(token) {
    return true;
}

module.exports = {
  authenticateToken: authenticateToken,
  allowedWriteOp: alloowedWriteOp,
  determineUserRole: determineUserRole
}