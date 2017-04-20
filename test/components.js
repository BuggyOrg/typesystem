/* global describe, it */

import chai from 'chai'
import * as Comp from '../src/components'

var expect = chai.expect

const pair = require('./fixtures/pair.json')
const join = require('./fixtures/or.json')
const innerOr = require('./fixtures/innerOr.json')
const innerOr2 = require('./fixtures/innerOr2.json')


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

  it('Creates constructor components for type constructors', () => {
    var pairC = Comp.components(pair)
    var pairCmp = pairC.find((e) => e.componentId === 'Pair')
    expect(pairCmp, 'Pair constructor is part of the components.').to.be.ok
    expect(pairCmp.ports, 'Pair constructor has a total of 3 ports.').to.have.length(3)
    expect(pairCmp.ports.map((p) => p.port)).to.include('0')
    expect(pairCmp.ports.map((p) => p.port)).to.include('1')
    expect(pairCmp.ports[2].kind).to.include('output')
    expect(pairCmp.ports[2].type).to.be.a('string')
  })

  it('Creates destructor components for type constructors', () => {
    var pairC = Comp.components(pair)
    expect(pairC).to.have.length(3)
  })

  it('Can create constructors for inner or-types', () => {
    var innerOrC = Comp.constructors(innerOr)
    expect(innerOrC).to.have.length(3)
    expect(innerOrC.map((i) => i.name)).to.contain('B')
    expect(innerOrC.map((i) => i.name)).to.contain('C')
    expect(innerOrC.map((i) => i.name)).to.contain('D')

    var innerOr2C = Comp.constructors(innerOr2)
    expect(innerOr2C).to.have.length(3)
    expect(innerOr2C.map((i) => i.name)).to.contain('B')
    expect(innerOr2C.map((i) => i.name)).to.contain('C')
    expect(innerOr2C.map((i) => i.name)).to.contain('Cons')
  })

  it('Can create components for inner or-types', () => {
    var innerOrC = Comp.components(innerOr)
    expect(innerOrC).to.have.length(8)
    expect(innerOrC.map((c) => c.componentId)).to.contain('de-B-0')
    expect(innerOrC.map((c) => c.componentId)).to.contain('de-B-1')
  })
})
