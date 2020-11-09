function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Definisi vertex2 pada segotiga
    /**
     * A (-0.5, 0.5); B (-0.5, -0.5); C (0.5, -0.5);
     */
    var vertices = [
        -0.5, 0.5, 0.5, 0.5, 0.5,  // Titik A
        -0.5, -0.5, 0.5, 0.5, 0.5, // Titik B
        0.5, -0.5, 0.5, 0.5, 0.5,   // Titik C
        0.5, -0.5, 0.0, 0.0, 0.1,  // Titik C
        0.5, 0.5, 0.0, 0.0, 0.1,  // Titik D
        -0.5, 0.5, 0.0, 0.0, 0.1  // Titik A
    ];

    // Buffer
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
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
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    var aColor = gl.getAttribLocation(shaderProgram, "a_Color"); 
    gl.vertexAttribPointer(
        aPosition,
        2, 
        gl.FLOAT, 
        false, 5 * Float32Array.BYTES_PER_ELEMENT, 
        0);
    gl.vertexAttribPointer(
        aColor, 
        3, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aColor);

    gl.viewport(100, 0, canvas.height, canvas.height); 

    // Buat segitiga step(1)
    var primitive = gl.TRIANGLES;
    var offset = 0;
    var count = 6; // Julah vertex yg akan digambar

    var dx = 0;
    var dy = 0;
    var dz = 0;
    var uDx = gl.getUniformLocation(shaderProgram, 'dx');
    var uDy = gl.getUniformLocation(shaderProgram, 'dy');
    var uDz = gl.getUniformLocation(shaderProgram, 'dz');
    // gl.uniform1f(uDz, dz); // Tidak perlu di dalam loop render, karena dz tidak berubah

    // Element interaktif
    var freeze = false;
    function onMouseClick(event) {
        freeze = !freeze;
    }
    document.addEventListener('click', onMouseClick, false);

    function onKeyDown(event) {
        if (event.keyCode == 32) freeza = true;
    }

    function onKeyUp(event) {
        if (event.keyCode == 32) freeza = false;
    }
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    function render(){
        if(!freeze){
            dx += 0.001;
            dy += 0.001;
            dz += 0.001;
        }
        gl.uniform1f(uDx, dx);
        gl.uniform1f(uDy, dy);
        gl.uniform1f(uDz, dz);
        gl.clearColor(0.0,0.5,1.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(primitive, offset, count);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}