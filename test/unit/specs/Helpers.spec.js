// import Vue from 'vue'
import * as _v_ from '../../../src/helpers'

describe('helpers', () => {

    it('Checks if is an Array', () => {
        expect(_v_.isArr([34, ' asdf', {}])).to.equal(true)
        expect(_v_.isArr([1, 2, 3])).to.equal(true)
        expect(_v_.isArr('test')).to.equal(false)
        // empty array return to false!
        expect(_v_.isArr([])).to.equal(false)
    })

    it('Checks if is an Object', () => {
        expect(_v_.isObj({})).to.equal(true)
        expect(_v_.isObj({1: 'asdf', 'a': [1, 2, 3, 4]})).to.equal(true)
        expect(_v_.isObj([])).to.equal(false)
        expect(_v_.isObj('string')).to.equal(false)
    })

    it('Checks if is a String', () => {
        expect(_v_.isStr('string')).to.equal(true)
        expect(_v_.isStr({a: 1})).to.equal(false)
        expect(_v_.isStr(null)).to.equal(false)
        // empty string return to false!
        expect(_v_.isStr('')).to.equal(false)
    })

    it('Checks if it gets the Object value', () => {
        expect(_v_.getObjValue({1: 'a'})).to.equal('a')
        expect(_v_.getObjValue({2: 'b'})).to.equal('b')
        expect(_v_.getObjValue({'obj': [2, 3, 4]})).to.deep.equal([2, 3, 4])
        expect(_v_.getObjValue({'obj': [2, 3, 4, {'nest?': 'yes'}]})).to.deep.equal([2, 3, 4, {'nest?': 'yes'}])
    })

    it('Checks if it gets the Object key', () => {
        expect(_v_.getObjKey({1: 'a'})).to.deep.equal(['1'])
        expect(_v_.getObjKey({2: 'b'})).to.deep.equal(['2'])
        expect(_v_.getObjKey({'obj': [2, 3, 4]})).to.deep.equal(['obj'])
        expect(_v_.getObjKey({'str': [2, 3, 4, {'nest?': 'yes'}]})).to.deep.equal(['str'])
    })

    it('Checks if it gets the value from Object', () => {
        expect(_v_.getIndexValue('crunch', {'sneakers': 'fine', 'mars': 'good', 'crunch': 'great'})).to.equal('great')
        expect(_v_.getIndexValue('x3g', {'34f': 'g42', 'x3g': 'yes!'})).to.equal('yes!')
    })

    it('Checks that returned value is Number between 0 and defined max value', () => {
        let max = 256
        let random = _v_.ranNum(max)
        expect(random).to.be.gte(0)
        expect(random).to.be.lte(max)
    })
})
