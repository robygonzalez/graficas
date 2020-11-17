var vertexShaderText =
    [
        'precision mediump float;',
        '',
        'attribute vec3 vertPosition;',
        'attribute vec3 vertColor;',
        'varying vec3 fragColor;',
        'uniform mat4 mWorld;',
        'uniform mat4 mView;',
        'uniform mat4 mProj;',
        '',
        'void main()',
        '{',
        '  fragColor = vertColor;',
        '  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
        '}'
    ].join('\n');

var fragmentShaderText =
    [
        'precision mediump float;',
        '',
        'varying vec3 fragColor;',
        'void main()',
        '{',
        '  gl_FragColor = vec4(fragColor, 1.0);',
        '}'
    ].join('\n');

var InitDemo = function () {
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('webgl');

    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    // Create shaders
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.validateProgram(program);

    var Vertices =
        [ // X, Y, Z           R, G, B
        //Torso
            // Front
            -2.0, 1.0, -1.0, 0.05, 0.68, 0.68,
            -2.0, 1.0, 2.0, 0.05, 0.68, 0.68,
            2.0, 1.0, 2.0, 0.05, 0.68, 0.68,
            2.0, 1.0, -1.0, 0.05, 0.68, 0.68,
            // Left
            -2.0, 1.0, 2.0, 0.05, 0.68, 0.68,
            -2.0, 0, 2.0, 0.05, 0.68, 0.68,
            -2.0, 0, -1.0, 0.05, 0.68, 0.68,
            -2.0, 1.0, -1.0, 0.05, 0.68, 0.68,
            // Right
            2.0, 1.0, 2.0, 0.05, 0.68, 0.68,
            2.0, 0.0, 2.0, 0.05, 0.68, 0.68,
            2.0, 0.0, -1.0, 0.05, 0.68, 0.68,
            2.0, 1.0, -1.0, 0.05, 0.68, 0.68,
            // Top
            2.0, 1.0, 2.0, 0.05, 0.68, 0.68,
            2.0, 0.0, 2.0, 0.05, 0.68, 0.68,
            -2.0, 0.0, 2.0, 0.05, 0.68, 0.68,
            -2.0, 1.0, 2.0, 0.05, 0.68, 0.68,
            // Bottom
            2.0, 1.0, -1.0, 0.05, 0.68, 0.68,
            2.0, 0, -1.0, 0.05, 0.68, 0.68,
            -2.0, 0, -1.0, 0.05, 0.68, 0.68,
            -2.0, 1.0, -1.0, 0.05, 0.68, 0.68,
            // Back
            -2.0, 0, -1.0, 0.05, 0.68, 0.68,
            -2.0, 0, 2.0, 0.05, 0.68, 0.68,
            2.0, 0, 2.0, 0.05, 0.68, 0.68,
            2.0, 0, -1.0, 0.05, 0.68, 0.68,          
        //Head
            // Front
            -1.0, 2.0, 2.0, 0.66, 0.49, 0.39,
            -1.0, 2.0, 4.0, 0.66, 0.49, 0.39,
            1.0, 2.0, 4.0, 0.66, 0.49, 0.39,
            1.0, 2.0, 2.0, 0.66, 0.49, 0.39,
            // Left
            -1.0, 2.0, 4.0, 0.54, 0.27, 0.07,
            -1.0, 0, 4.0, 0.54, 0.27, 0.07,
            -1.0, 0, 2.0, 0.54, 0.27, 0.07,
            -1.0, 2.0, 2.0, 0.54, 0.27, 0.07,
            // Right
            1.0, 2.0, 4.0, 0.54, 0.27, 0.07,
            1.0, 0.0, 4.0, 0.54, 0.27, 0.07,
            1.0, 0.0, 2.0, 0.54, 0.27, 0.07,
            1.0, 2.0, 2.0, 0.54, 0.27, 0.07,
            // Top
            1.0, 2.0, 4.0, 0.54, 0.27, 0.07,
            1.0, 0.0, 4.0, 0.54, 0.27, 0.07,
            -1.0, 0.0, 4.0, 0.54, 0.27, 0.07,
            -1.0, 2.0, 4.0, 0.54, 0.27, 0.07,
            // Bottom
            1.0, 2.0, 2.0, 0.66, 0.49, 0.39,
            1.0, 0, 2.0, 0.66, 0.49, 0.39,
            -1.0, 0, 2.0, 0.66, 0.49, 0.39,
            -1.0, 2.0, 2.0, 0.66, 0.49, 0.39,
            // Back
            -1.0, 0, 2.0, 0.54, 0.27, 0.07,
            -1.0, 0, 4.0, 0.54, 0.27, 0.07,
            1.0, 0, 4.0, 0.54, 0.27, 0.07,
            1.0, 0, 2.0, 0.54, 0.27, 0.07
        //Legs
            // Front
            -1.0, 1.0, -3.0, 0.28, 0.27, 0.59,
            -1.0, 1.0, -1.0, 0.28, 0.27, 0.59,
            1.0, 1.0, -1.0, 0.28, 0.27, 0.59,
            1.0, 1.0, -3.0, 0.28, 0.27, 0.59,
            // Left
            -1.0, 1.0, -1.0, 0.28, 0.27, 0.59,
            -1.0, 0, -1.0, 0.28, 0.27, 0.59,
            -1.0, 0, -3.0, 0.28, 0.27, 0.59,
            -1.0, 1.0, -3.0, 0.28, 0.27, 0.59,
            // Right
            1.0, 1.0, -1.0, 0.28, 0.27, 0.59,
            1.0, 0.0, -1.0, 0.28, 0.27, 0.59,
            1.0, 0.0, -3.0, 0.28, 0.27, 0.59,
            1.0, 1.0, -3.0, 0.28, 0.27, 0.59,
            // Top
            1.0, 1.0, -1.0, 0.28, 0.27, 0.59,
            1.0, 0.0, -1.0, 0.28, 0.27, 0.59,
            -1.0, 0.0, -1.0, 0.28, 0.27, 0.59,
            -1.0, 1.0, -1.0, 0.28, 0.27, 0.59,
            // Bottom
            1.0, 1.0, -3.0, 0.28, 0.27, 0.59,
            1.0, 0, -3.0, 0.28, 0.27, 0.59,
            -1.0, 0, -3.0, 0.28, 0.27, 0.59,
            -1.0, 1.0, -3.0, 0.28, 0.27, 0.59,
            // Back
            -1.0, 0, -3.0, 0.28, 0.27, 0.59,
            -1.0, 0, -1.0, 0.28, 0.27, 0.59,
            1.0, 0, -1.0, 0.28, 0.27, 0.59,
            1.0, 0, -3.0, 0.28, 0.27, 0.59,
        //Shoes
            // Front
            -1.0, 1.0, -4.0, 0.19, 0.19, 0.16,
            -1.0, 1.0, -3.0, 0.19, 0.19, 0.16,
            1.0, 1.0, -3.0, 0.19, 0.19, 0.16,
            1.0, 1.0, -4.0, 0.19, 0.19, 0.16,
            // Left
            -1.0, 1.0, -3.0, 0.19, 0.19, 0.16,
            -1.0, 0, -3.0, 0.19, 0.19, 0.16,
            -1.0, 0, -4.0, 0.19, 0.19, 0.16,
            -1.0, 1.0, -4.0, 0.19, 0.19, 0.16,
            // Right
            1.0, 1.0, -3.0, 0.19, 0.19, 0.16,
            1.0, 0.0, -3.0, 0.19, 0.19, 0.16,
            1.0, 0.0, -4.0, 0.19, 0.19, 0.16,
            1.0, 1.0, -4.0, 0.19, 0.19, 0.16,
            // Top
            1.0, 1.0, -3.0, 0.19, 0.19, 0.16,
            1.0, 0.0, -3.0, 0.19, 0.19, 0.16,
            -1.0, 0.0, -3.0, 0.19, 0.19, 0.16,
            -1.0, 1.0, -3.0, 0.19, 0.19, 0.16,
            // Bottom
            1.0, 1.0, -4.0, 0.19, 0.19, 0.16,
            1.0, 0, -4.0, 0.19, 0.19, 0.16,
            -1.0, 0, -4.0, 0.19, 0.19, 0.16,
            -1.0, 1.0, -4.0, 0.19, 0.19, 0.16,
            // Back
            -1.0, 0, -4.0, 0.19, 0.19, 0.16,
            -1.0, 0, -3.0, 0.19, 0.19, 0.16,
            1.0, 0, -3.0, 0.19, 0.19, 0.16,
            1.0, 0, -4.0, 0.19, 0.19, 0.16,
        ];

    var boxIndices =
        [
        //torso
            // Top
            0, 1, 2,
            0, 2, 3,
            // Left
            5, 4, 6,
            6, 4, 7,
            // Right
            8, 9, 10,
            8, 10, 11,
            // Front
            13, 12, 14,
            15, 14, 12,
            // Back
            16, 17, 18,
            16, 18, 19,
            // Bottom
            21, 20, 22,
            22, 20, 23,
        //head
            24, 25, 26, // Top
            24, 26, 27, // Top
            29, 28, 30, // Left
            30, 28, 31, // Left
            32, 33, 34, // Right
            32, 34, 35, // Right
            37, 36, 38, // Front
            39, 38, 36, // Front 
            40, 41, 42, // Back
            40, 42, 43, // Back
            45, 44, 46, // Bottom
            46, 44, 47, // Bottom
        /*/Legs
            48, 49, 50, // Top
            48, 50, 51, // Top
            53, 52, 54, // Left
            54, 52, 55, // Left
            56, 57, 58, // Right
            56, 58, 59, // Right
            61, 60, 62, // Front
            63, 62, 60, // Front
            64, 65, 66, // Back
            64, 66, 67, // Back
            69, 68, 70, // Bottom
            70, 68, 71, // Bottom
        //Shoes
            72, 73, 74, // Top
            72, 74, 75, // Top
            77, 76, 78, // Left
            78, 76, 79, // Left
            80, 81, 82, // Right 
            80, 82, 83, // Right 
            85, 84, 86, // Front
            87, 86, 84, // Front
            88, 89, 90, // Back
            88, 90, 91, // Back
            93, 92, 94, // Bottom
            94, 92, 95, // Bottom */
        ];

    var boxVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Vertices), gl.STATIC_DRAW);

    var boxIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        positionAttribLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.vertexAttribPointer(
        colorAttribLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    // Tell OpenGL state machine which program should be active.
    gl.useProgram(program);

    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, 0, -16], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);

    var identityMatrix = new Float32Array(16);
    mat4.identity(identityMatrix);
    var angle = 0;
    var loop = function () {
        angle = performance.now() / 1000 / 6 * 2 * Math.PI;
        mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
        mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
        mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};
