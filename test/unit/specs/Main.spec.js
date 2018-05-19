import Vue from 'vue'
import Main from '@/components/Main'

describe('Main.vue', () => {
    const Constructor = Vue.extend(Main)
    const vm = new Constructor().$mount()

    it('Checks if is an Array', () => {
        expect(vm.isArr([34, ' asdf', {}])).to.equal(true)
        expect(vm.isArr([1, 2, 3])).to.equal(true)
        expect(vm.isArr('test')).to.equal(false)
        // empty array return to false!
        expect(vm.isArr([])).to.equal(false)
    })

    it('Checks if is an Object', () => {
        expect(vm.isObj({})).to.equal(true)
        expect(vm.isObj({1: 'asdf', 'a': [1, 2, 3, 4]})).to.equal(true)
        expect(vm.isObj([])).to.equal(false)
        expect(vm.isObj('string')).to.equal(false)
    })

    it('Checks if is a String', () => {
        expect(vm.isStr('string')).to.equal(true)
        expect(vm.isStr({a: 1})).to.equal(false)
        expect(vm.isStr(null)).to.equal(false)
        // empty string return to false!
        expect(vm.isStr('')).to.equal(false)
    })

    it('Checks if it gets the Object value', () => {
        expect(vm.getObjValue({1: 'a'})).to.equal('a')
        expect(vm.getObjValue({2: 'b'})).to.equal('b')
        expect(vm.getObjValue({'obj': [2, 3, 4]})).to.deep.equal([2, 3, 4])
        expect(vm.getObjValue({'obj': [2, 3, 4, {'nest?': 'yes'}]})).to.deep.equal([2, 3, 4, {'nest?': 'yes'}])
    })

    it('Checks if it gets the Object key', () => {
        expect(vm.getObjKey({1: 'a'})).to.deep.equal(['1'])
        expect(vm.getObjKey({2: 'b'})).to.deep.equal(['2'])
        expect(vm.getObjKey({'obj': [2, 3, 4]})).to.deep.equal(['obj'])
        expect(vm.getObjKey({'str': [2, 3, 4, {'nest?': 'yes'}]})).to.deep.equal(['str'])
    })

    it('Checks if it gets the value from Object', () => {
        expect(vm.getIndexValue('crunch', {'sneakers': 'fine', 'mars': 'good', 'crunch': 'great'})).to.equal('great')
        expect(vm.getIndexValue('x3g', {'34f': 'g42', 'x3g': 'yes!'})).to.equal('yes!')
    })
})
