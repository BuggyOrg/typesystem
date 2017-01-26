/* global describe, it */

import chai from 'chai'
import * as Comp from '../src/components'

var expect = chai.expect

const pair = require('./fixtures/pair.json')

const join = require('./fixtures/or.json')


describe('Creating Components from Types', () => {
  it('Constructor extraction', () => {
    expect(Comp.constructors(pair).map(Comp.name)).to.include('Pair')
  })

  it('Creates multiple constructors in the flat setting', () => {
    var consts = Comp.constructors(join)
    expect(consts).to.have.length(2)
    expect(consts.map(Comp.name)).to.include('B')
    expect(consts.map(Comp.name)).to.include('C')
  })

  it('Creates components for type constructors', () => {
    var pairC = Comp.components(pair)
    expect(pairC).to.have.length(1)
    expect(pairC[0].componentId).to.equal('Pair')
    expect(pairC[0].ports).to.have.length(3)
    expect(pairC[0].ports.map((p) => p.port)).to.include('0')
    expect(pairC[0].ports.map((p) => p.port)).to.include('1')
    expect(pairC[0].ports[2].kind).to.include('output')
    expect(pairC[0].ports[2].type).to.be.an('object')
  })
})
