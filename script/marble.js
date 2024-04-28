async function main() {
    const canvas = document.querySelector("#marble")
    const gl = canvas.getContext("webgl")
    if (!gl) return

    const vs = `attribute vec4 a_position;
void main() {
    gl_Position = a_position;
}`

    const fs = await (await fetch("script/marble.glsl")).text()

    // setup GLSL program
    const
        program = webglUtils.createProgramFromSources(gl, [vs, fs]),
        positionAttributeLocation = gl.getAttribLocation(program, "a_position"),
        resolutionLocation = gl.getUniformLocation(program, "iResolution"),
        timeLocation = gl.getUniformLocation(program, "iTime"),
        positionBuffer = gl.createBuffer()

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // fill it with a 2 triangles that cover clipspace
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
    ]), gl.STATIC_DRAW)

    let requestId
    function requestFrame() {
        if (!requestId) {
            requestId = requestAnimationFrame(render)
        }
    }

    let then = 0
    let time = 0
    function render(now) {
        requestId = undefined
        now *= 0.001
        const elapsedTime = Math.min(now - then, 0.1)
        time += elapsedTime
        then = now

        webglUtils.resizeCanvasToDisplaySize(gl.canvas)

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        gl.useProgram(program)
        gl.enableVertexAttribArray(positionAttributeLocation)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
        gl.uniform1f(timeLocation, time)
        gl.drawArrays(gl.TRIANGLES,0,6)

        requestFrame()
    }
    requestFrame()
}

main()