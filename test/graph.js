/* global describe, it */

import chai from 'chai'
import * as Graph from '@buggyorg/graphtools'
import * as API from '../src/api'

var expect = chai.expect

const pair = require('./fixtures/pairGraph.json')
const array = require('./fixtures/array.json')

describe('Converting Graphs', () => {
  describe('Simple Structs', () => {
    it('Create a Graph with Pair Constructors and Types', () => {
      const graph = Graph.fromJSON(pair)
      const pairGraph = API.createTypes(graph)
      expect(Graph.components(pairGraph)).to.have.length(5)
    })

    it('Creates an `isType` method', () => {
      const graph = Graph.fromJSON(pair)
      const pairGraph = API.createTypes(graph)
      expect(Graph.components(pairGraph).filter((c) => c.componentId === 'isType')).to.have.length(1)
    })

    it('Adds components for Arrays', () => {
      const graph = Graph.fromJSON(array)
      const arrayGraph = API.createTypes(graph)
      expect(Graph.components(arrayGraph).filter((c) => c.componentId === 'Array3')).to.have.length(1)
    })
  })
})
