import * as CG from './transforms.js';
import { Matrix } from './matrix.js';

class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // limit_fps_flag:      bool 
    // fps:                 int
    constructor(canvas, limit_fps_flag, fps) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.limit_fps = limit_fps_flag;
        this.fps = fps;
        this.start_time = null;
        this.prev_time = null;

        // slide0
        let centerX = 300;
        let centerY = 300;
        let radius = 60;
        let num_edges = 100;
        let Vx_0 = 100;
        let Vy_0 = 100;

        let vertices = [];
        for (let angle=0; angle<2*Math.PI; angle+=2*Math.PI/num_edges) {
            let x = Math.round(centerX + radius * Math.cos(angle));
            let y = Math.round(centerY + radius * Math.sin(angle));
            vertices.push(CG.Vector3(x, y, 1));
        }
        //

        // slide1
        let Vx_1_0 = 100;
        let Vy_1_0 = 100;
        //

        this.models = {
            slide0: [
                {
                    vertices: vertices,
                    center: CG.Vector3(centerX, centerY, 1),
                    velocity: [Vx_0, Vy_0, 1],
                    radius: radius,
                    transform: new Matrix(3, 3)
                }
            ],
            slide1: [
                {
                    vertices: [
                        CG.Vector3(300, 200, 1),
                        CG.Vector3(200, 300, 1),
                        CG.Vector3(100, 200, 1),
                        CG.Vector3(200, 100, 1)
                    ],
                    center: CG.Vector3(200, 200, 1),
                    velocity: [Vx_1_0, Vy_1_0, 1],
                    theta: Math.PI/4,
                    transform: new Matrix(3, 3)
                }
            ],
            slide2: [],
            slide3: []
        };
    }

    // flag:  bool
    limitFps(flag) {
        this.limit_fps = flag;
    }

    // n:  int
    setFps(n) {
        this.fps = n;
    }

    // idx: int
    setSlideIndex(idx) {
        this.slide_idx = idx;
    }

    animate(timestamp) {
        // Get time and delta time for animation
        if (this.start_time === null) {
            this.start_time = timestamp;
            this.prev_time = timestamp;
        }
        let time = timestamp - this.start_time;
        let delta_time = timestamp - this.prev_time;
        //console.log('animate(): t = ' + time.toFixed(1) + ', dt = ' + delta_time.toFixed(1));

        // Update transforms for animation
        this.updateTransforms(time, delta_time);

        // Draw slide
        this.drawSlide();

        // Invoke call for next frame in animation
        if (this.limit_fps) {
            setTimeout(() => {
                window.requestAnimationFrame((ts) => {
                    this.animate(ts);
                });
            }, Math.floor(1000.0 / this.fps));
        }
        else {
            window.requestAnimationFrame((ts) => {
                this.animate(ts);
            });
        }

        // Update previous time to current one for next calculation of delta time
        this.prev_time = timestamp;
    }

    //
    updateTransforms(time, delta_time) {
        // TODO: update any transformations needed for animation
        // time sine last frame: P = previousP + velocity * delta_time
        // note: time is in milliseconds -> time/1000 makes time in seconds

        // slide0
        let tx_0 = this.models.slide0[0].transform.values[0][2] + this.models.slide0[0].velocity[0] * delta_time/1000;
        let ty_0 = this.models.slide0[0].transform.values[1][2] + this.models.slide0[0].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide0[0].transform, tx_0, ty_0);
        console.log(this.models.slide0[0].transform);

        // slide1 (translate * rotate * translate)
        let tx_1_0 = this.models.slide1[0].transform.values[0][2] + this.models.slide1[0].velocity[0] * delta_time/1000;
        let ty_1_0 = this.models.slide1[0].transform.values[1][2] + this.models.slide1[0].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide1[0].transform, tx_1_0, ty_1_0);
        let translate1 = this.models.slide1[0].transform
        
        CG.mat3x3Rotate(this.models.slide1[0].transform, this.models.slide1[0].theta);
        let rotate = this.models.slide1[0].transform;



        console.log(this.models.slide1[0].transform);
    }
    
    //
    drawSlide() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0();
                break;
            case 1:
                this.drawSlide1();
                break;
            case 2:
                this.drawSlide2();
                break;
            case 3:
                this.drawSlide3();
                break;
        }
    }

    //
    drawSlide0() {
        // TODO: draw bouncing ball (circle that changes direction whenever it hits an edge)

        // set new vertices that form the ball as it gets translated
        let newVertices = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide0[0].transform, this.models.slide0[0].vertices[i]]);
            newVertices.push(v);
        }

        // set new center of the ball as it gets translated
        let newCenter = Matrix.multiply([this.models.slide0[0].transform, this.models.slide0[0].center]);
        
        // did the ball hit a right/left edge?
        if (newCenter.values[0][0] + this.models.slide0[0].radius >= this.canvas.width) {
            this.models.slide0[0].velocity[0] = -100;
        }
        if (newCenter.values[0][0] - this.models.slide0[0].radius <= 0) {
            this.models.slide0[0].velocity[0] = 100;
        }
        // did the ball hit a bottom/top edge?
        if (newCenter.values[1][0] + this.models.slide0[0].radius >= this.canvas.height) {
            this.models.slide0[0].velocity[1] = -100;
        }
        if (newCenter.values[1][0] - this.models.slide0[0].radius <= 0) {
            this.models.slide0[0].velocity[1] = 100;
        }

        let color = [66, 158, 245, 255];
        this.drawConvexPolygon(newVertices, color);

        // Following lines are example of drawing a single polygon
        // (this should be removed/edited after you implement the slide)
        //let teal = [0, 128, 128, 255];
        //this.drawConvexPolygon(newVertices, teal);
    }

    //
    drawSlide1() {
        // TODO: draw at least 3 polygons that spin about their own centers
        //   - have each polygon spin at a different speed / direction
        
        // translate to the origin
        let newVertices0 = [
            CG.Vector3(100, 0, 1),
            CG.Vector3(0, 100, 1),
            CG.Vector3(-100, 0, 1),
            CG.Vector3(0, -100, 1)
        ];
        // rotate about the origin

        
        // translate back to the original location
        




        let color = [66, 158, 245, 255];
        this.drawConvexPolygon(newVertices0, color);
        
    }

    //
    drawSlide2() {
        // TODO: draw at least 2 polygons grow and shrink about their own centers
        //   - have each polygon grow / shrink different sizes
        //   - try at least 1 polygon that grows / shrinks non-uniformly in the x and y directions


    }

    //
    drawSlide3() {
        // TODO: get creative!
        //   - animation should involve all three basic transformation types
        //     (translation, scaling, and rotation)
        
        
    }
    
    // vertex_list:  array of object [Matrix(3, 1), Matrix(3, 1), ..., Matrix(3, 1)]
    // color:        array of int [R, G, B, A]
    drawConvexPolygon(vertex_list, color) {
        this.ctx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3] / 255) + ')';
        this.ctx.beginPath();
        let x = vertex_list[0].values[0][0] / vertex_list[0].values[2][0];
        let y = vertex_list[0].values[1][0] / vertex_list[0].values[2][0];
        this.ctx.moveTo(x, y);
        for (let i = 1; i < vertex_list.length; i++) {
            x = vertex_list[i].values[0][0] / vertex_list[i].values[2][0];
            y = vertex_list[i].values[1][0] / vertex_list[i].values[2][0];
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
};

export { Renderer };
