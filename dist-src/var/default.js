const Default = {
  material: "Physical",
  color: 0x1155ff,
  texture: {
    wrapping: "Repeat"
  },
  event: {
    type: "once",
    keyTrigger: /^[A-Za-z]$/
  },
  layer: {
    bloom: 999,
  },
  shader: {
    vertexShader: `varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
    fragmentShader: `uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;
varying vec2 vUv;
void main() {
  gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
}`
  },
}

export default Default