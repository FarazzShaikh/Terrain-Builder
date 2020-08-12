let gl = undefined
let fbo = undefined

export function registerGLContext(context) {
    gl = context
}

export function registerFBO(_fbo) {
    fbo = _fbo
}

export function erode() {
    // let canvas = document.querySelector('.ui-map-canvas');
    // gl = canvas.getContext('webgl');

    const raw_heightBuffer = readPixels()
    console.log(raw_heightBuffer)
}

function readPixels() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    return pixels
}