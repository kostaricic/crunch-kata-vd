// import getPathArr from '../../../src/check-service'
import * as _path_ from '../../../src/check-service'

const graph = require('../../../fixtures/order.json').graph
describe('Ensure that service', () => {
    describe('getPathArr', () => {
        it('gets correct array path for entry', () => {
            let index = '7a89e0'
            let actual = _path_.getPathArr(graph, index)
            expect(actual).to.deep.equal([0, 'Awareness Metrics', 0, 'Taxis', 1])
        })
    })
    describe('getPathStr', () => {
        it('gets correct string path for entry', () => {
            let index = "7a89e0"
            let expected = "[0]['Awareness Metrics'][0]['Taxis'][1]"
            let actual = _path_.getPathStr(graph, index)
            expect(actual).to.deep.equal(expected)
        })
    })

})
