/********************
    @Describe: DrawingBoard structure
    @Param: param = [*]
    @Return: null
    @BeCareful:
********************/ 
/*@@@@@@control-start@@@@@@*/

function ControlDrawingBoard(params) {
    this.ModuleId = {
        "container":"id_DrawingBoard_Container",
        "vertexShader":"id_DrawingBoard_vertexShader",
        "fragmentShader":"id_DrawingBoard_fragmentShader"
    }

    this.initialize = function(){
        try {
            this.init();
            this.animate();
        } catch (e) {
            var param = {
                "class":"log",       //log,message
                "kind":"error",        //error,warn,success,record
                "message":"DrawingBoard exception."      //output message
            }
            moduleStart("LogReport", param, this.returns);
            console.log(e);
        }
    };
    
    this.returns = function(){
        
    }

    var container = void 0;
    var camera = void 0,
        scene = void 0,
        renderer = void 0;
    var uniforms = void 0;

    this.init = function() {
        container = document.getElementById(this.ModuleId['container']);

        camera = new THREE.Camera();
        camera.position.z = 1;

        scene = new THREE.Scene();

        var geometry = new THREE.PlaneBufferGeometry(2, 2);

        uniforms = {
            u_time: { type: "f", value: 1000.0 },
            u_resolution: { type: "v2", value: new THREE.Vector2() },
            u_mouse: { type: "v2", value: new THREE.Vector2() }
        };

        var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById(this.ModuleId['vertexShader']).textContent,
            fragmentShader: document.getElementById(this.ModuleId['fragmentShader']).textContent
        });

        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);

        container.appendChild(renderer.domElement);

        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize, false);

        document.onmousemove = function (e) {
            uniforms.u_mouse.value.x = e.pageX;
            uniforms.u_mouse.value.y = e.pageY;
        };
    }

    this.onWindowResize = function(event) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.x = renderer.domElement.width;
        uniforms.u_resolution.value.y = renderer.domElement.height;
    }

    this.animate = function() {
        requestAnimationFrame(DrawingBoard.animate);
        DrawingBoard.render();
    }

    this.render = function() {
        uniforms.u_time.value += 0.05 * (1 + uniforms.u_mouse.value.x / 500);
        renderer.render(scene, camera);
    }

}



/*@@@@@@control-end@@@@@@*/

/**Test Code**/
var DrawingBoard;
var ControlInit = function(){
    var DrawingBoardInfo = {};
    DrawingBoard = new ControlDrawingBoard(DrawingBoardInfo);
    DrawingBoard.initialize();
}
