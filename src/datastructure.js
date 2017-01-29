
function createStructure (tDef, idx) {
  if (typeof (tDef.type) === 'string') return {kind: 'basic', type: tDef.type, name: 'arg' + idx}
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
