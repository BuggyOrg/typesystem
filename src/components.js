
import flatten from 'lodash/fp/flatten'
import * as DS from './datastructure'

function defConstructors (tDef) {
  if (tDef.name === 'or') {
    return flatten(tDef.data.map(defConstructors))
  } else if (Array.isArray(tDef.data)) {
    return [{ name: tDef.name, params: tDef.data }].concat(flatten(tDef.data.map(defConstructors)))
  } else if (tDef.type) {
    return []
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
  return typeFn.params.map((p, idx) => ({ name: 'p_' + (p.name || '' + idx), type: p.type }))
}

export function components (type) {
  return constructors(type).map((c) => ({
    componentId: name(c),
    ports: parameters(c).map((p) => ({port: p.name, kind: 'input', type: p.type}))
      .concat([{port: 'output', kind: 'output', type: type.type.type}]),
    version: '0.0.0',
    atomic: true,
    type: true,
    metaInformation: {
      isConstructor: true,
      datastructure: DS.createDatastructure(c)
    }
  }))
  .concat(flatten(constructors(type).map((c) =>
    parameters(c).map((i, idx) => ({
      componentId: 'de-' + name(c) + '-' + idx,
      ports: [{port: 'in', kind: 'input', type: type.type.type}, {port: 'out', kind: 'output', type: i.type}],
      version: '0.0.0',
      atomic: true,
      type: true,
      metaInformation: {
        isDestructor: true,
        parameter: i.name,
        datastructure: DS.createDatastructure(c)
      }
    })))))
}

