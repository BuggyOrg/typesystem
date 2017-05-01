
function createStructure (tDef, idx) {
  if (typeof (tDef.type) === 'string') return {kind: 'basic', type: tDef.type, name: 'argp_' + idx}
  if (tDef.name === 'or') {
    return {
      type: 'orStruct',
      contents: tDef.data
    }
  }
  return {
    type: 'struct',
    contents: tDef.map(createStructure)
  }
}

export function createDatastructure (type) {
  return {
    name: type.name,
    structure: createStructure(type.params)
  }
}
