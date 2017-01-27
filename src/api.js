
import * as Graph from '@buggyorg/graphtools'
import flatten from 'lodash/fp/flatten'
import {components} from './components'

export function createTypes (graph) {
  const types = Graph.components(graph).filter((c) => c.type)
  return Graph.flow(flatten(types.map((t) => components(t.metaInformation.type).map((c) => Graph.addComponent(c)))))(graph)
}
