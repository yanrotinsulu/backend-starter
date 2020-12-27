const {hashSync,hashASync,compareSync,compareAsync} = require('../app/helpers/hashes');

describe('test to see if functions are defined',()=>{
    it("test hashSync function",()=>{
        expect(hashSync).not.toBeUndefined()
    })
    it("test hashASync function",()=>{
        expect(hashASync).not.toBeUndefined()
    })
    it("test compareSync function",()=>{
        expect(compareSync).not.toBeUndefined()
    })
    it("test compareAsync function",()=>{
        expect(compareAsync).not.toBeUndefined()
    })
});