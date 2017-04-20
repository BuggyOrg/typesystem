
function createStructure (tDef, idx) {
  console.log(tDef)
  if (typeof (tDef.type) === 'string') return {kind: 'basic', type: tDef.type, name: 'arg' + idx}
  if (tDef.name === 'or') {
    return {
      type: 'struct',
      contents: tDef.data.map(createStructure)
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
