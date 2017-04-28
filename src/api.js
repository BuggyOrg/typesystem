
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
  const types = Graph.components(graph).filter((c) => c.type)
  return Graph.flow(
    flatten(types.map((t) => components(t.metaInformation.type).map((c) => Graph.addComponent(c)))),
    Graph.addComponent(isType()),
    createArrayComponents
  )(graph)
}

export {components}
