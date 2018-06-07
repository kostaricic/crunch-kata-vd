// import getPathArr from '../../../src/check-service'
import * as $ from '../../../src/check-service'

describe('Ensure that service', () => {

    describe('getPathArr', () => {
        let graph = require('../../../fixtures/order.json').graph

        it('gets correct path for entry', () => {
            let index = '7a89e0'
            let expected = 'pera'
            let actual = $.getPathArr(graph, index)
            console.log(actual);
            expect(actual).to.deep.equal([0, 'Awareness Metrics', 0, 'Taxis', 1])


        })

    })
})
