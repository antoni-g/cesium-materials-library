function verifyToken(token) {
  return token == 'Bearer test';
}

module.exports = {
  verifyToken: verifyToken
}