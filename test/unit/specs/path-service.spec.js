// import getPathArr from '../../../src/check-service'
import * as _path_ from '../../../src/path-service'
import _ from 'lodash'

const graph = require('../../../fixtures/order.json').graph
describe('Ensure that service', () => {
    describe('getPathArr', () => {
        it('gets correct array path for entry', () => {
            let index = '7a89e0'
            let actual = _path_.getPathArr(graph, index)
            expect(actual).to.deep.equal([0, 'Awareness Metrics', 0, 'Taxis', 1])
        })
    })
    describe('getAllPathsStr', () => {
        it('gets correct string paths for entry', () => {
            let foodArr0 = [
                {
                    'fruits': ['apples', 'peaches', 'plums']
                },
                {
                    'vegetables': [
                        {'green': ['salad', 'peas']},
                        {'red': ['tomatoes', 'paprika']}
                    ]
                },
                {
                    'sweets': ['great!']
                }
            ]

            // getting all paths from foodArr
            let foodPaths = _path_.getAllPathsStr(foodArr0)
            let foodObj = {}
            // loop through paths
            for (let prop in foodPaths) {
                // make duplicate from paths and store it in Object
                _.set(foodObj, foodPaths[prop], prop)
            }
            let foodArr1 = []
            // iterate over object
            for (let prop in foodObj) {
                // convert to Array for comparison
                foodArr1.push(foodObj[prop])
            }
            expect(foodArr0).to.deep.equal(foodArr1)
        })

        it('gets correct string paths for entries / graph fixture', () => {
            let graphPaths = _path_.getAllPathsStr(graph)
            let graphObj = {}

            for (let prop in graphPaths) {
                _.set(graphObj, graphPaths[prop], prop)
            }
            let graph1 = []

            for (let prop in graphObj) {
                graph1.push(graphObj[prop])
            }
            expect(graph).to.deep.equal(graph1)
        })
    })
})
