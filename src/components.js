
import flatten from 'lodash/fp/flatten'
import * as DS from './datastructure'

function defConstructors (tDef) {
  if (tDef.name === 'or') {
    return flatten(tDef.data.map(defConstructors))
  } else {
    return [{ name: tDef.name, params: tDef.data }]
  }
}

/**
 * Extracts all constructors from the type definition
 * @param {Type} type The type definition
 * @returns {TypeFunction[]} A list of type functions
 */
export function constructors (type) {
  return defConstructors(type.definition)
}

/**
 * Gets the name of a TypeFunction
 * @param {TypeFunction} typeFn The TypeFunction
 * @returns {string} The name of the TypeFunction
 */
export function name (typeFn) {
  return typeFn.name
}

function parameters (typeFn) {
  return typeFn.params.map((p, idx) => ({ name: (p.name || '' + idx), type: p.type }))
}

export function components (type) {
  return constructors(type).map((c) => ({
    componentId: name(c),
    ports: parameters(c).map((p) => ({port: p.name, kind: 'input', type: p.type}))
      .concat([{port: 'output', kind: 'output', type: type}]),
    version: '0.0.0',
    atomic: true,
    type: true,
    metaInformation: {
      constructor: true,
      datastructure: DS.createDatastructure(c)
    }
  }))
}
