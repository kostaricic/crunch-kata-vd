import Vue from 'vue'
import MainComponent from '@/components/MainComponent'
import * as _ from '../../../src/helpers'

describe('MainComponent.vue', () => {
    const Constructor = Vue.extend(MainComponent)
    const vm = new Constructor().$mount()
    it('Checks if is an Array', () => {
        expect(_.isArr([34, ' asdf', {}])).to.equal(true)
        expect(_.isArr([1, 2, 3])).to.equal(true)
        expect(_.isArr('test')).to.equal(false)
        // empty array return to false!
        expect(_.isArr([])).to.equal(false)
    })

    it('Checks if is an Object', () => {
        expect(_.isObj({})).to.equal(true)
        expect(_.isObj({1: 'asdf', 'a': [1, 2, 3, 4]})).to.equal(true)
        expect(_.isObj([])).to.equal(false)
        expect(_.isObj('string')).to.equal(false)
    })
    it('Checks if is a String', () => {
        expect(_.isStr('string')).to.equal(true)
        expect(_.isStr({a: 1})).to.equal(false)
        expect(_.isStr(null)).to.equal(false)
        // empty string return to false!
        expect(_.isStr('')).to.equal(false)
    })

    it('Checks if it gets the Object value', () => {
        expect(_.getObjValue({1: 'a'})).to.equal('a')
        expect(_.getObjValue({2: 'b'})).to.equal('b')
        expect(_.getObjValue({'obj': [2, 3, 4]})).to.deep.equal([2, 3, 4])
        expect(_.getObjValue({'obj': [2, 3, 4, {'nest?': 'yes'}]})).to.deep.equal([2, 3, 4, {'nest?': 'yes'}])
    })

    it('Checks if it gets the Object key', () => {
        expect(_.getObjKey({1: 'a'})).to.deep.equal(['1'])
        expect(_.getObjKey({2: 'b'})).to.deep.equal(['2'])
        expect(_.getObjKey({'obj': [2, 3, 4]})).to.deep.equal(['obj'])
        expect(_.getObjKey({'str': [2, 3, 4, {'nest?': 'yes'}]})).to.deep.equal(['str'])
    })

    it('Checks if it gets the value from Object', () => {
        expect(_.getIndexValue('crunch', {'sneakers': 'fine', 'mars': 'good', 'crunch': 'great'})).to.equal('great')
        expect(_.getIndexValue('x3g', {'34f': 'g42', 'x3g': 'yes!'})).to.equal('yes!')
    })
})
