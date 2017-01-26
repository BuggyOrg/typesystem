/* global describe, it */

import chai from 'chai'
import * as DS from '../src/datastructure'

var expect = chai.expect

const pair = require('./fixtures/pair.json')

describe('Choosing Data Types from Types', () => {
  describe('Simple Structs', () => {
    it('Creates a struct for pairs', () => {
      const pairDS = DS.createDatastructure(pair)
      expect(pairDS).to.be.an('object')
    })
  })
})
