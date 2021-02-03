describe("materialsHandler", function() {
  describe("getLibraryOfMaterials", function() {
    const handler = require('../../handler/materialsHandler');
    const dao = require('../../dao/materialsDAO');

    it("will handle a dao exception", function() {
      spyOn(dao, 'queryForAllMaterials').and.throwError('TimeoutException');

      res = handler.getLibraryOfMaterials('admin');

      expect(res['results']).toBeUndefined();
      expect(res['error']).toEqual('error accessing db to getLibraryOfMaterials: TimeoutException');
      expect(dao.queryForAllMaterials).toHaveBeenCalledWith('admin');
    });

    it("will return an empty result successfully", function() {
      spyOn(dao, 'queryForAllMaterials').and.returnValue({})

      res = handler.getLibraryOfMaterials('admin');

      expect(res['results']).toEqual({})
      expect(res['error']).toBeUndefined();
      expect(dao.queryForAllMaterials).toHaveBeenCalledWith('admin');
    });

    it("will return a single result successfully", function() {

    });

    it("will return multiple results successfully", function() {

    });
  });

  describe("upsertMaterial", function() {
    const handler = require('../../handler/materialsHandler');
    const dao = require('../../dao/materialsDAO');

    it("will handle a dao exception", function() {
     
    });

    it("will handle an empty request successfully", function() {
     
    });

    it("will handle a validation error successfully", function() {

    });

    it("will handle an add successfully", function() {

    });

    it("will handle an update successfully", function() {

    });
  });  

  describe("deleteMaterial", function() {
    const handler = require('../../handler/materialsHandler');
    const dao = require('../../dao/materialsDAO');

    it("will handle a dao exception", function() {
     
    });

    it("will handle an empty request successfully", function() {
     
    });

    it("will handle a delete successfully", function() {

    });

    it("will handle a delete on a nonexistent resource successfully", function() {

    });
  });   
});
