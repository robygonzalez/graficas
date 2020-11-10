//Roberta González A01570010
var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    'uniform float screenWidth;',
    '',
    'void main()',
    '{',
    '   fragColor = vertColor;',
    '   gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n');

var fragmentShaderText= [
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'uniform float screenWidth;',
    'void main()',
    '{',
    '   gl_FragColor = vec4(fragColor, 1.0);',
    '}'
].join('\n');

var InitDemo = function () {
    var canvas = document.getElementById('game-surface');
    var gl = canvas.getContext('webgl');

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.log("error in vertex shader:", gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.log("error in fragment shader:", gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram(); //graphics pipelina
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("error in program:", gl.getProgramInfoLog(program));
        return;
    }

    //ahora si a dibujar

    var triangleVertices = [
        //X, Y R, G, B
        0.0, 0.5, 1.0, 1.0, 0.0,
        -0.5, -0.5, 0.7, 0.0, 1.0,
        0.5, -0.5, 0.1, 1.0, 0.6
    ];

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW); //STATIC_DRAW pq no vas a moverlo

    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 5*Float32Array.BYTES_PER_ELEMENT, 0); //Attrib location, number of elements per attribute, type of elemens, normalized, size of vertex, offset from beggining of a single vertex to this attr
    gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, gl.FALSE, 5*Float32Array.BYTES_PER_ELEMENT, 2*Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    //main render loop
    gl.useProgram(program);
    //pa dibujar el triangulo
    gl.drawArrays(gl.TRIANGLES, 0, 3); //usa el buffer que está actively bound, le dices que dibujaras triangulios, que no se salte ninguno, y tiene 3 vertices
};
