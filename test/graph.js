/* global describe, it */

import chai from 'chai'
import * as Graph from '@buggyorg/graphtools'
import * as API from '../src/api'

var expect = chai.expect

const pair = require('./fixtures/pairGraph.json')

describe('Converting Graphs', () => {
  describe('Simple Structs', () => {
    it('Create a Graph with Pair Constructors and Types', () => {
      const graph = Graph.fromJSON(pair)
      const pairGraph = API.createTypes(graph)
      expect(Graph.components(pairGraph)).to.have.length(2)
    })
  })
})
