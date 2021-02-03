var express = require('express');
var router = express.Router();

const auth = require('../auth/materialsAuth');
const handler = require('../handler/materialsHandler');

function bodyEmpty(body) {
  return body === undefined || body == {} || body.material === undefined;
}

router.get('/all', function (req, res) {
  const bearerToken = req.headers['authorization'];
  if (auth.authenticateToken(bearerToken)) {
    res.setHeader('Content-Type', 'application/json');
    fetchResult = handler.getLibraryOfMaterials(auth.determineUserRole(bearerToken));
    if (res.error) {
      res.status(500)
    }
    res.json(fetchResult);
  } else {
    res.sendStatus(403);
  }
})

router.post('/', function(req, res) {

  console.log(req.body)

  const bearerToken = req.headers['authorization'];
  if (auth.authenticateToken(bearerToken) && auth.allowedWriteOp(bearerToken)) {
    res.setHeader('Content-Type', 'application/json');
    if (bodyEmpty(req.body)) {
      res.status(500);
      res.json({error: 'body is empty'});
    } else {
       addResult = handler.upsertMaterial(auth.determineUserRole(bearerToken), req.body);
      if (addResult.error) {
        res.status(500)
      } else {
        addResult.update ? res.status(200) : res.status(201)
      }
      res.json(addResult);
    }
  } else {
    res.sendStatus(403);
  }
})

router.delete('/', function(req,res) {
  const bearerToken = req.headers['authorization'];
  if (auth.authenticateToken(bearerToken) && auth.allowedWriteOp(bearerToken)) {
    deleteResult = handler.deleteMaterial(auth.determineUserRole(bearerToken), req.body);
    if (deleteResult.error) {
      res.status(500);
    } else {
      res.status(200);
    }
    res.send();
  }
});

module.exports = router