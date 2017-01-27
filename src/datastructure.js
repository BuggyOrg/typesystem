
function createStructure (tDef) {
  if (typeof (tDef.type) === 'string') return {type: 'basic', name: tDef.type}
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
