function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Definisi vertex2 pada segotiga
    /**
     * A (-0.5, 0.5); B (-0.5, -0.5); C (0.5, -0.5);
     */
    var vertices = [
        -0.5, 0.5,  // Titik A
        -0.5, -0.5, // Titik B
        -0.5, -0.5, // Titik B
        0.5, -0.5,   // Titik C
        0.5, -0.5,   // Titik C
        -0.5, 0.5  // Titik A
    ];

    // Buffer
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); //memutus proses buffer

    var vertexShaderCode = document.getElementById("vertexShaderSource").text;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShaderCode = document.getElementById("fragmentShaderSource").text;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Memetakan buffer CPU ke attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position"); 
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(0.0,0.5,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Buat segitiga step(1)
    var primitive = gl.LINES;
    var offset = 0;
    var count = 6; // Julah vertex yg akan digambar

    gl.drawArrays(primitive, offset, count);
}