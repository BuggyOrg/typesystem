
import * as Graph from '@buggyorg/graphtools'
import flatten from 'lodash/fp/flatten'
import {components} from './components'
import {createArrayComponents} from './array'

const isType = () => ({
  componentId: 'isType',
  ports: [
    {
      port: 'typeName',
      kind: 'input',
      type: 'String'
    },
    {
      port: 'value',
      kind: 'input',
      type: 'generic'
    },
    {
      port: 'isType',
      kind: 'output',
      type: 'Bool'
    }
  ],
  version: '1.0.0',
  atomic: true
})

export function createTypes (graph) {
  const types = Graph.components(graph).filter((c) => c.type && !c.metaInformation.isConstructor && !c.metaInformation.isDestructor)
  return Graph.flow(
    flatten(types.map((t) => components(t.metaInformation.type).map((c) => (Graph.hasComponent(c, graph)) ? (g) => g : Graph.addComponent(c)))),
    (Graph.hasComponent(isType(), graph) ? (g) => g : Graph.addComponent(isType())),
    createArrayComponents
  )(graph)
}

export {components}
