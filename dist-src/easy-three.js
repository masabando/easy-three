import * as THREE from 'three'

import _Default from './var/default.js'
import prep from './base/prep.js'
import _animate from './base/animate.js'
import _fpv from './base/fpv.js'
import _raycaster from './base/raycaster.js'
import addCreate from './create/main.js'
import addPostprocessing from './postprocessing/main.js';
import addLoad from './load/main.js';
import addHelper from './helper/main.js';
import addEvent from './event/main.js'
import addTool from './tool/main.js'

export function init(targetName, {
  pixelRatio = window.devicePixelRatio,
} = {}) {
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
  } = prep({ targetName, THREE, pixelRatio })


  const load = {}
  addLoad({ load, Default, THREE, scene })

  const create = {}
  addCreate({ create, Default, scene, THREE, load })

  const fpv = _fpv({ camera, THREE, domElement, controls })

  const raycaster = _raycaster({ camera, THREE, domElement })

  const animate = _animate({ controls, renderer, scene, camera, THREE, fpv })


  const helper = {}
  addHelper({ helper, scene, THREE })

  const postprocessing = {}
  addPostprocessing({ postprocessing, renderer, camera, scene, THREE, color, sizeTarget, Default })

  const event = {}
  addEvent({ Default, THREE, event, domElement })

  const tool = {}
  addTool({ tool, renderer })

  return {
    Default,
    scene,
    camera,
    renderer,
    controls,
    fpv,
    create,
    load,
    helper,
    event,
    animate,
    THREE,
    color,
    postprocessing,
    tool,
    raycaster,
    noToneMapping,
    destroy,
  }
}