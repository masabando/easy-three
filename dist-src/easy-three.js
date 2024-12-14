import * as THREE from 'three'

import _Default from './var/default.js'
import prep from './base/prep.js'
import _animate from './base/animate.js'
import addCreate from './create/main.js'
import addPostprocessing from './postprocessing/main.js';
import addLoad from './load/main.js';
import addHelper from './helper/main.js';
import addEvent from './event/main.js'

export function init(targetName) {
  const Default = _Default
  const {
    domElement,
    scene,
    camera,
    renderer,
    controls,
    sizeTarget,
    sizeTargetResize,
    windowResize,
    color,
    noToneMapping,
    destroy,
  } = prep({ targetName, THREE })

  const create = {}
  addCreate({ create, Default, scene, THREE })
  const animate = _animate({ controls, renderer, scene, camera, THREE })

  const helper = {}
  addHelper({ helper, scene, THREE })

  const postprocessing = {}
  addPostprocessing({ postprocessing, renderer, camera, scene, THREE, color, sizeTarget, Default })

  const load = {}
  addLoad({ load, Default, THREE, scene })

  const event = {}
  addEvent({ Default, THREE, event, domElement })

  return {
    Default,
    scene,
    camera,
    renderer,
    controls,
    create,
    load,
    helper,
    event,
    animate,
    THREE,
    color,
    postprocessing,
    noToneMapping,
    destroy,
    DoubleSide: THREE.DoubleSide,
  }
}