// import getPathArr from '../../../src/check-service'
import * as _path_ from '../../../src/check-service'
import _ from 'lodash'

const graph = require('../../../fixtures/order.json').graph
describe('Ensure that service', () => {
    describe('getPathArr', () => {
        it('gets correct array path for entry', () => {
            let index = '7a89e0'
            let actual = _path_.getPathArr(graph, index)
            expect(actual).to.deep.equal([0, 'Awareness Metrics', 0, 'Taxis', 1])
            // debugger
        })
    })
    describe('getAllPathsStr', () => {
        it('gets correct string path for entry', () => {
            let expected = "[0]['Awareness Metrics'][0]['Taxis'][1]"
            let actual = _path_.getAllPathsStr(graph)
            let obj = [
                {
                    'voce': ['jabuka', 'kruska', 'sljiva']
                },
                {
                    'povrce': [
                        {'zeleno': ['salata', 'grasak']},
                        {'crveno': ['paradajza', 'paprika']}
                    ]
                },
                {
                    'slatkisi': ['super']
                }
            ]

            let objPaths = _path_.getAllPathsStr(obj)
            let obj2 = {}
            for (let prop in objPaths) {
                _.set(obj2, objPaths[prop], prop)
            }
            let obj3 = []
            for (let prop in obj2) {
                obj3.push(obj2[prop])
            }
            // debugger
            expect(obj3).to.deep.equal(obj)

            // expect(actual).to.equal(expected)
        })
    })

})
