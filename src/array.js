
import * as Graph from '@buggyorg/graphtools'
import {uniqBy, fill} from 'lodash'

function arrayComponents (comp) {
  if (comp.nodes) {
    return comp.nodes
      .map((n, idx) => [idx, n])
      .filter(([idx, n]) => n.ref.indexOf('Array') === 0)
  }
  return []
}

/**
 * Lists all array references in a graph
 * @param {Portgraph} graph The graph
 */
export function listArrays (graph) {
  const comps = Graph.components(graph)
  return comps.reduce((list, c) =>
    list.concat(arrayComponents(c)
      .map((a) => ({path: [c.componentId, a[0]], node: a[1]}))),
    [])
}

export function renameArrays (graph) {
  const arrays = listArrays(graph)
  return arrays.reduce((curGraph, arrObj) => {
    const [cId, nIdx] = arrObj.path
    const comp = Graph.component(cId, curGraph)
    const newNodes = comp.nodes.map((n, idx) => {
      if (idx === nIdx) {
        return Object.assign({}, arrObj.node, {ref: 'Array' + n.metaInformation.length})
      }
    })
    return Graph.updateComponent(cId, {nodes: newNodes}, curGraph)
  }, graph)
}

function arrayType (len) {
  return {
    type: {
      name: 'Array',
      data: [{ type: 'a' }]
    },
    definition: {
      name: 'Array' + len,
      data: Array(len).fill({ type: 'a' })
    }
  }
}

function inputs (len) {
  return fill(Array(len), 0).map((_, idx) => ({
    port: 'input' + idx,
    kind: 'input',
    type: arrayType(len)
  }))
}

export function components (graph) {
  const arrays = listArrays(graph)
  return uniqBy(arrays, (arrObj) => arrObj.node.metaInformation.length)
    .map((arrObj) => {
      const len = arrObj.node.metaInformation.length
      return {
        componentId: 'Array' + len,
        version: '1.0.0',
        ports: inputs(len).concat({port: 'output', kind: 'output', type: arrayType(len)}),
        atomic: true,
        type: true,
        metaInformation: {
          isConstructor: true
        }
      }
    })
}

export function createArrayComponents (graph) {
  return Graph.flow(
    components(graph).map((c) => Graph.addComponent(c)),
    renameArrays
  )(graph)
}