
import * as Graph from '@buggyorg/graphtools'
import {uniqBy, fill} from 'lodash'

function arrayComponents (comp) {
  if (comp.nodes) {
    return comp.nodes
      .map((n, idx) => [idx, n])
      .filter(([idx, n]) => n.ref && n.ref.indexOf('Array') === 0)
  }
  return []
}

function arrayNodes (graph) {
  return Graph.nodesDeep(graph)
    .filter((n) => n.ref && n.ref.indexOf('Array') === 0)
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
    []).concat(arrayNodes(graph)
      .map((n) => ({path: [n.path, n.id], node: n})))
}

export function renameArrays (graph) {
  const arrays = listArrays(graph)
  return arrays.reduce((curGraph, arrObj) => {
    const [cId, nIdx] = arrObj.path
    if (Array.isArray(cId)) {
      var n = Graph.node(cId, curGraph)
      n.ref = 'Array' + n.metaInformation.length
      return curGraph
    }
    const comp = Graph.component(cId, curGraph)
    const newNodes = comp.nodes.map((n, idx) => {
      if (idx === nIdx) {
        return Object.assign({}, arrObj.node, {ref: 'Array' + n.metaInformation.length})
      }
    })
    return Graph.updateComponent(cId, {nodes: newNodes}, curGraph)
  }, graph)
}

/*
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
*/

function arrayDataType () {
  return {
    name: 'Array',
    data: ['a']
  }
}

function inputs (len) {
  return fill(Array(len), 0).map((_, idx) => ({
    port: 'input' + idx,
    kind: 'input',
    type: 'a'
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
        ports: inputs(len).concat({port: 'output', kind: 'output', type: arrayDataType(len)}),
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
