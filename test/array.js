/* global describe, it */

import chai from 'chai'
import * as Graph from '@buggyorg/graphtools'
import * as Arrays from '../src/array'

const Node = Graph.Node

var expect = chai.expect

const array = require('./fixtures/array.json')


describe('Arrays', () => {
  describe('.listArrays', () => {
    it('Lists all array constructors', () => {
      const arrays = Arrays.listArrays(array)
      expect(arrays).to.be.defined
      expect(arrays).to.have.length(1)
      expect(arrays.every((a) => a.node.ref === 'Array')).to.be.true
    })

    it('Lists all array constructors from nodes', () => {
      const g = Graph.addNode({ref: 'Array', metaInformation: { length: 0 }}, Graph.empty())
      const arrays = Arrays.listArrays(g)
      expect(arrays).to.have.length(1)
    })
  })

  describe('.renameArrays', () => {
    it('Renames all array', () => {
      const graph = Arrays.renameArrays(array)
      const preArrays = Arrays.listArrays(array)
      const arrays = Arrays.listArrays(graph)
      expect(arrays.length).to.equal(preArrays.length)
      expect(arrays[0].node.ref).to.equal('Array3')
    })
  })

  describe('.components', () => {
    it('creates components for array sizes', () => {
      const arrComps = Arrays.components(array)
      expect(arrComps).to.be.defined
      expect(arrComps).to.have.length(1)
      expect(arrComps[0].componentId).to.equal('Array3')
    })

    it('can create array components from nodes', () => {
      const g = Graph.addNode({ref: 'Array', metaInformation: { length: 0 }}, Graph.empty())
      const comps = Arrays.components(g)
      expect(comps).to.have.length(1)
    })
  })

  describe('.createArrayComponents', () => {
    it('Adds components for the array arity', () => {
      const newGraph = Arrays.createArrayComponents(array)
      expect(Graph.components(array)).to.have.length(1)
      expect(Graph.components(newGraph)).to.have.length(2)
    })

    it.only('can add array components from nodes', () => {
      const g = Graph.addNode({ref: 'Array', metaInformation: { length: 0 }}, Graph.empty())
      const newGraph = Arrays.createArrayComponents(g)
      expect(Graph.components(newGraph)).to.have.length(1)
      expect(Graph.hasNode('/Array0', newGraph)).to.be.true
      expect(Graph.components(newGraph)[0].componentId).to.equal('Array0')
    })
  })
})
