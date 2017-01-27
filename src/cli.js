#!/usr/bin/env node

import * as cliExt from 'cli-ext'
import * as Graph from '@buggyorg/graphtools'
import {createTypes} from './api'

cliExt.input(process.argv[2])
.then((graphStr) => {
  var graph = Graph.fromJSON(JSON.parse(graphStr))
  return createTypes(graph)
})
.then((res) => console.log(JSON.stringify(res, null, 2)))
.catch((err) => console.error(err.stack || err))
