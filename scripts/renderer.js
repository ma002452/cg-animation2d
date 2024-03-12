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
        let translate = new Matrix(3, 3);
        let rotate = new Matrix(3, 3);

        let translate1 = new Matrix(3, 3);
        let rotate1 = new Matrix(3, 3);

        let translate2 = new Matrix(3, 3);
        let rotate2 = new Matrix(3, 3);
        //
        
        // slide2
        let translate3 = new Matrix(3, 3);
        let scale = new Matrix(3 ,3);
        let verticesAtOrigin = [];
        for (let angle=0; angle<2*Math.PI; angle+=2*Math.PI/num_edges) {
            let x = Math.round(0 + radius * Math.cos(angle));
            let y = Math.round(0 + radius * Math.sin(angle));
            verticesAtOrigin.push(CG.Vector3(x, y, 1));
        }
        let track = 0; // track is either 0 or 1



        let translate4 = new Matrix(3, 3);
        let scale1 = new Matrix(3 ,3);
        let radius1 = 40;
        let num_edges1 = 7;
        let verticesAtOrigin1 = [];
        for (let angle=0; angle<2*Math.PI; angle+=2*Math.PI/num_edges1) {
            let x = Math.round(0 + radius1 * Math.cos(angle));
            let y = Math.round(0 + radius1 * Math.sin(angle));
            verticesAtOrigin1.push(CG.Vector3(x, y, 1));
        }
        let track1 = 0; // track is either 0 or 1
        //

        // slide3
        let radius2 = 100;
        let vertices2 = [];
        for (let angle=0; angle<2*Math.PI; angle+=2*Math.PI/num_edges) {
            let x = Math.round(centerX + radius2 * Math.cos(angle));
            let y = Math.round(centerY + radius2 * Math.sin(angle));
            vertices2.push(CG.Vector3(x, y, 1));
        }

        let translate7 = new Matrix(3, 3);
        let rotate3 = new Matrix(3, 3);

        let translate5 = new Matrix(3, 3);
        let rotate4 = new Matrix(3, 3);

        // flower center
        let translate6 = new Matrix(3, 3);
        let scale2 = new Matrix(3, 3);
        let track2 = 0;

        // flower petal1
        let translate8 = new Matrix(3, 3);
        let scale3 = new Matrix(3, 3);
        let track3 = 0;

        // flower petal2
        let translate9 = new Matrix(3, 3);
        let scale4 = new Matrix(3, 3);
        let track4 = 0;

        // flower petal3
        let translate10 = new Matrix(3, 3);
        let scale5 = new Matrix(3, 3);
        let track5 = 0;

        // flower petal4
        let translate11 = new Matrix(3, 3);
        let scale6 = new Matrix(3, 3);
        let track6 = 0;

        // flower petal5
        let translate12 = new Matrix(3, 3);
        let scale7 = new Matrix(3, 3);
        let track7 = 0;
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
                    verticesAtOrigin: [
                        CG.Vector3(100, 0, 1),
                        CG.Vector3(0, 100, 1),
                        CG.Vector3(-100, 0, 1),
                        CG.Vector3(0, -100, 1)
                    ],
                    velocity: [100, 100, 1],
                    translate: translate,
                    rotate: rotate,
                    theta: Math.PI/100,
                    transform: Matrix.multiply([translate, rotate])
                },
                {
                    vertices: [
                        CG.Vector3(700, 600, 1),
                        CG.Vector3(600, 700, 1),
                        CG.Vector3(500, 600, 1),
                        CG.Vector3(550, 500, 1),
                        CG.Vector3(650, 500, 1)
                    ],
                    center: CG.Vector3(400, 450, 1),
                    verticesAtOrigin: [
                        CG.Vector3(100, 0, 1),
                        CG.Vector3(0, 100, 1),
                        CG.Vector3(-100, 0, 1),
                        CG.Vector3(-50, -100, 1),
                        CG.Vector3(50, -100, 1)
                    ],
                    velocity: [100, 100, 1],
                    translate1: translate1,
                    rotate1: rotate1,
                    theta: -Math.PI/20,
                    transform: Matrix.multiply([translate1, rotate1])
                },
                {
                    vertices: [
                        CG.Vector3(800, 300, 1),
                        CG.Vector3(700, 500, 1),
                        CG.Vector3(600, 300, 1)
                    ],
                    center: CG.Vector3(650, 200, 1),
                    verticesAtOrigin: [
                        CG.Vector3(100, -100, 1),
                        CG.Vector3(0, 100, 1),
                        CG.Vector3(-100, -100, 1)
                    ],
                    velocity: [70, 70, 1],
                    translate2: translate2,
                    rotate2: rotate2,
                    theta: Math.PI/2,
                    transform: Matrix.multiply([translate2, rotate2])
                }
            ],
            slide2: [
                {
                    vertices: vertices,
                    center: CG.Vector3(200, 200, 1),
                    velocity: [0.05, 0.05, 1],
                    radius: radius,
                    verticesAtOrigin: verticesAtOrigin,
                    translate3: translate3,
                    scale: scale,
                    track: track,
                    transform: Matrix.multiply([translate3, scale])
                },
                {
                    center: CG.Vector3(470, 420, 1),
                    velocity: [0.05, 0.05, 1],
                    radius1: radius1,
                    verticesAtOrigin1: verticesAtOrigin1,
                    translate4: translate4,
                    scale1: scale1,
                    track1: track1,
                    transform: Matrix.multiply([translate4, scale1])
                }
            ],
            slide3: [
                {
                    vertices: vertices2,
                    center: CG.Vector3(centerX, centerY, 1),
                    velocity: [100, 100, 1],
                    radius2: radius2,
                    transform2: new Matrix(3, 3)
                },
                {
                    vertices3: vertices2,
                    center: CG.Vector3(0, 0, 1),
                    velocity: [200, 200, 1],
                    radius2: radius2,
                    transform2: new Matrix(3, 3)
                },
                {//shape 1
                    vertices: [
                        CG.Vector3(400, 200, 1),
                        CG.Vector3(200, 300, 1),
                        CG.Vector3(100, 200, 1),
                        CG.Vector3(200, 100, 1)
                    ],
                    center: CG.Vector3(500, 500, 1),
                    verticesAtOrigin: [
                        CG.Vector3(100, 0, 1),
                        CG.Vector3(0, 100, 1),
                        CG.Vector3(-100, 0, 1),
                        CG.Vector3(0, -100, 1)
                    ],
                    velocity: [100, 100, 1],
                    translate7: translate7,
                    rotate3: rotate3,
                    theta: Math.PI/100,
                    transform: Matrix.multiply([translate7, rotate3])
                },
                {//shape 2
                    vertices: [
                        CG.Vector3(500, 200, 1),
                        CG.Vector3(200, 300, 1),
                        CG.Vector3(100, 200, 1),
                        CG.Vector3(200, 100, 1)
                    ],
                    center: CG.Vector3(100, 500, 1),
                    verticesAtOrigin: [
                        CG.Vector3(400, 0, 1),
                        CG.Vector3(0, 100, 1),
                        CG.Vector3(100, 0, 1),
                        CG.Vector3(0, -100, 1)
                    ],
                    velocity: [100, 100, 1],
                    translate5: translate5,
                    rotate4: rotate4,
                    theta: Math.PI/100,
                    transform: Matrix.multiply([translate5, rotate4])
                },
                {
                    center: CG.Vector3(595, 300, 1),
                    velocity: [0.05, 0.05, 1],
                    radius: 70,
                    verticesAtOrigin: verticesAtOrigin,
                    translate6: translate6,
                    scale2: scale2,
                    track2: track2,
                    transform: Matrix.multiply([translate6, scale2])
                },
                {
                    center: CG.Vector3(500, 250, 1),
                    velocity: [0.05, 0.05, 1],
                    radius: 70,
                    verticesAtOrigin: verticesAtOrigin,
                    translate8: translate8,
                    scale3: scale3,
                    track3: track3,
                    transform: Matrix.multiply([translate8, scale3])
                },
                {
                    center: CG.Vector3(510, 340, 1),
                    velocity: [0.05, 0.05, 1],
                    radius: 70,
                    verticesAtOrigin: verticesAtOrigin,
                    translate9: translate9,
                    scale4: scale4,
                    track4: track4,
                    transform: Matrix.multiply([translate9, scale4])
                },
                {
                    center: CG.Vector3(595, 400, 1),
                    velocity: [0.05, 0.05, 1],
                    radius: 70,
                    verticesAtOrigin: verticesAtOrigin,
                    translate10: translate10,
                    scale5: scale5,
                    track5: track5,
                    transform: Matrix.multiply([translate10, scale5])
                },
                {
                    center: CG.Vector3(680, 340, 1),
                    velocity: [0.05, 0.05, 1],
                    radius: 70,
                    verticesAtOrigin: verticesAtOrigin,
                    translate11: translate11,
                    scale6: scale6,
                    track6: track6,
                    transform: Matrix.multiply([translate11, scale6])
                },
                {
                    center: CG.Vector3(690, 250, 1),
                    velocity: [0.05, 0.05, 1],
                    radius: 70,
                    verticesAtOrigin: verticesAtOrigin,
                    translate12: translate12,
                    scale7: scale7,
                    track7: track7,
                    transform: Matrix.multiply([translate12, scale7])
                }
            ]
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



        // slide1
        // rotate
        CG.mat3x3Rotate(this.models.slide1[0].rotate, this.models.slide1[0].theta);
        // translate to the desired location
        let tx_1 = this.models.slide1[0].center.values[0][0] + this.models.slide1[0].velocity[0] * delta_time/1000;
        let ty_1 = this.models.slide1[0].center.values[1][0] + this.models.slide1[0].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide1[0].translate, tx_1, ty_1);

        CG.mat3x3Rotate(this.models.slide1[1].rotate1, this.models.slide1[1].theta);
        let tx_2 = this.models.slide1[1].center.values[0][0] + this.models.slide1[1].velocity[0] * delta_time/1000;
        let ty_2 = this.models.slide1[1].center.values[1][0] + this.models.slide1[1].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide1[1].translate1, tx_2, ty_2);

        CG.mat3x3Rotate(this.models.slide1[2].rotate2, this.models.slide1[2].theta);
        let tx_3 = this.models.slide1[2].center.values[0][0] + this.models.slide1[2].velocity[0] * delta_time/1000;
        let ty_3 = this.models.slide1[2].center.values[1][0] + this.models.slide1[2].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide1[2].translate2, tx_3, ty_3);



        // slide2
        // translate to the desired location
        let tx_4 = this.models.slide2[0].center.values[0][0] + this.models.slide2[0].velocity[0] * delta_time/1000;
        let ty_4 = this.models.slide2[0].center.values[1][0] + this.models.slide2[0].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide2[0].translate3, tx_4, ty_4);
        // scale
        if (this.models.slide2[0].radius <= 60) {
            CG.mat3x3Scale(this.models.slide2[0].scale, 1.1, 1.1);
            this.models.slide2[0].radius = this.models.slide2[0].radius * 1.1;
            this.models.slide2[0].track = 0;
        }
        else if (this.models.slide2[0].radius >= 550) {
            CG.mat3x3Scale(this.models.slide2[0].scale, 0.9, 0.9);
            this.models.slide2[0].radius = this.models.slide2[0].radius * 0.9;
            this.models.slide2[0].track = 1;
        }
        else {
            if (this.models.slide2[0].track == 1) {
                this.models.slide2[0].radius = this.models.slide2[0].radius * 0.9;
            }
            else if (this.models.slide2[0].track == 0) {
                this.models.slide2[0].radius = this.models.slide2[0].radius * 1.1;
            }
        }

        // translate to the desired location
        let tx_5 = this.models.slide2[1].center.values[0][0] + this.models.slide2[1].velocity[0] * delta_time/1000;
        let ty_5 = this.models.slide2[1].center.values[1][0] + this.models.slide2[1].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide2[1].translate4, tx_5, ty_5);
        // scale
        if (this.models.slide2[1].radius1 <= 40) {
            CG.mat3x3Scale(this.models.slide2[1].scale1, 1.1, 1);
            this.models.slide2[1].radius1 = this.models.slide2[1].radius1 * 1.1;
            this.models.slide2[1].track1 = 0;
        }
        else if (this.models.slide2[1].radius1 >= 550) {
            CG.mat3x3Scale(this.models.slide2[1].scale1, 0.9, 1);
            this.models.slide2[1].radius1 = this.models.slide2[1].radius1 * 0.9;
            this.models.slide2[1].track1 = 1;
        }
        else {
            if (this.models.slide2[1].track1 == 0) {
                this.models.slide2[1].radius1 = this.models.slide2[1].radius1 * 1.1;
            }
            else if (this.models.slide2[1].track1 == 1) {
                this.models.slide2[1].radius1 = this.models.slide2[1].radius1 * 0.9;
            }
        }



        // slide3
        let tx_10 = this.models.slide3[0].transform2.values[0][2] + this.models.slide3[0].velocity[1] * delta_time/1000;
        let ty_10 = this.models.slide3[0].transform2.values[1][2] + this.models.slide3[0].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide3[0].transform2, tx_10, ty_10);

        let tx_6 = this.models.slide3[1].transform2.values[1][2] + this.models.slide3[0].velocity[1] * delta_time/1000;
        let ty_6 = this.models.slide3[1].transform2.values[1][2] + this.models.slide3[0].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide3[1].transform2, tx_6, ty_6);

        CG.mat3x3Rotate(this.models.slide3[2].rotate3, this.models.slide3[2].theta);
        let tx_7 = this.models.slide3[2].center.values[0][0] + this.models.slide3[2].velocity[0] * delta_time/1000;
        let ty_7 = this.models.slide3[2].center.values[1][0] + this.models.slide3[2].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide3[2].translate7, tx_7, ty_7);

        CG.mat3x3Rotate(this.models.slide3[3].rotate4, this.models.slide3[3].theta);
        let tx_8 = this.models.slide3[3].center.values[0][0] + this.models.slide3[3].velocity[0] * delta_time/1000;
        let ty_8 = this.models.slide3[3].center.values[1][0] + this.models.slide3[3].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide3[3].translate5, tx_8, ty_8);





        // flower center
        let tx_11 = this.models.slide3[4].center.values[0][0] + this.models.slide3[4].velocity[0] * delta_time/1000;
        let ty_11 = this.models.slide3[4].center.values[1][0] + this.models.slide3[4].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide3[4].translate6, tx_11, ty_11);
        if (this.models.slide3[4].radius <= 70) {
            CG.mat3x3Scale(this.models.slide3[4].scale2, 1.1, 1.1);
            this.models.slide3[4].radius = this.models.slide3[4].radius * 1.1;
            this.models.slide3[4].track2 = 0;
        }
        else if (this.models.slide3[4].radius >= 550) {
            CG.mat3x3Scale(this.models.slide3[4].scale2, 0.9, 0.9);
            this.models.slide3[4].radius = this.models.slide3[4].radius * 0.9;
            this.models.slide3[4].track2 = 1;
        }
        else {
            if (this.models.slide3[4].track2 == 1) {
                this.models.slide3[4].radius = this.models.slide3[4].radius * 0.9;
            }
            else if (this.models.slide3[4].track2 == 0) {
                this.models.slide3[4].radius = this.models.slide3[4].radius * 1.1;
            }
        }

        // flower petal1
        let tx_12 = this.models.slide3[5].center.values[0][0] + this.models.slide3[5].velocity[0] * delta_time/1000;
        let ty_12 = this.models.slide3[5].center.values[1][0] + this.models.slide3[5].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide3[5].translate8, tx_12, ty_12);
        if (this.models.slide3[5].radius <= 70) {
            CG.mat3x3Scale(this.models.slide3[5].scale3, 1.1, 1.1);
            this.models.slide3[5].radius = this.models.slide3[4].radius * 1.1;
            this.models.slide3[5].track3 = 0;
        }
        else if (this.models.slide3[5].radius >= 550) {
            CG.mat3x3Scale(this.models.slide3[5].scale3, 0.9, 0.9);
            this.models.slide3[5].radius = this.models.slide3[5].radius * 0.9;
            this.models.slide3[5].track3 = 1;
        }
        else {
            if (this.models.slide3[5].track3 == 1) {
                this.models.slide3[5].radius = this.models.slide3[5].radius * 0.9;
            }
            else if (this.models.slide3[5].track3 == 0) {
                this.models.slide3[5].radius = this.models.slide3[5].radius * 1.1;
            }
        }

        // flower petal2
        let tx_13 = this.models.slide3[6].center.values[0][0] + this.models.slide3[6].velocity[0] * delta_time/1000;
        let ty_13 = this.models.slide3[6].center.values[1][0] + this.models.slide3[6].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide3[6].translate9, tx_13, ty_13);
        if (this.models.slide3[6].radius <= 70) {
            CG.mat3x3Scale(this.models.slide3[6].scale4, 1.1, 1.1);
            this.models.slide3[6].radius = this.models.slide3[6].radius * 1.1;
            this.models.slide3[6].track4 = 0;
        }
        else if (this.models.slide3[6].radius >= 550) {
            CG.mat3x3Scale(this.models.slide3[6].scale4, 0.9, 0.9);
            this.models.slide3[6].radius = this.models.slide3[6].radius * 0.9;
            this.models.slide3[6].track4 = 1;
        }
        else {
            if (this.models.slide3[6].track4 == 1) {
                this.models.slide3[6].radius = this.models.slide3[6].radius * 0.9;
            }
            else if (this.models.slide3[6].track4 == 0) {
                this.models.slide3[6].radius = this.models.slide3[6].radius * 1.1;
            }
        }

        // flower petal3
        let tx_14 = this.models.slide3[7].center.values[0][0] + this.models.slide3[7].velocity[0] * delta_time/1000;
        let ty_14 = this.models.slide3[7].center.values[1][0] + this.models.slide3[7].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide3[7].translate10, tx_14, ty_14);
        if (this.models.slide3[7].radius <= 70) {
            CG.mat3x3Scale(this.models.slide3[7].scale5, 1.1, 1.1);
            this.models.slide3[7].radius = this.models.slide3[7].radius * 1.1;
            this.models.slide3[7].track5 = 0;
        }
        else if (this.models.slide3[7].radius >= 550) {
            CG.mat3x3Scale(this.models.slide3[7].scale5, 0.9, 0.9);
            this.models.slide3[7].radius = this.models.slide3[7].radius * 0.9;
            this.models.slide3[7].track5 = 1;
        }
        else {
            if (this.models.slide3[7].track5 == 1) {
                this.models.slide3[7].radius = this.models.slide3[7].radius * 0.9;
            }
            else if (this.models.slide3[7].track5 == 0) {
                this.models.slide3[7].radius = this.models.slide3[7].radius * 1.1;
            }
        }

        // flower petal4
        let tx_15 = this.models.slide3[8].center.values[0][0] + this.models.slide3[8].velocity[0] * delta_time/1000;
        let ty_15 = this.models.slide3[8].center.values[1][0] + this.models.slide3[8].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide3[8].translate11, tx_15, ty_15);
        if (this.models.slide3[8].radius <= 70) {
            CG.mat3x3Scale(this.models.slide3[8].scale6, 1.1, 1.1);
            this.models.slide3[8].radius = this.models.slide3[8].radius * 1.1;
            this.models.slide3[8].track6 = 0;
        }
        else if (this.models.slide3[8].radius >= 550) {
            CG.mat3x3Scale(this.models.slide3[8].scale6, 0.9, 0.9);
            this.models.slide3[8].radius = this.models.slide3[8].radius * 0.9;
            this.models.slide3[8].track6 = 1;
        }
        else {
            if (this.models.slide3[8].track6 == 1) {
                this.models.slide3[8].radius = this.models.slide3[8].radius * 0.9;
            }
            else if (this.models.slide3[8].track6 == 0) {
                this.models.slide3[8].radius = this.models.slide3[8].radius * 1.1;
            }
        }

        // flower petal5
        let tx_16 = this.models.slide3[9].center.values[0][0] + this.models.slide3[9].velocity[0] * delta_time/1000;
        let ty_16 = this.models.slide3[9].center.values[1][0] + this.models.slide3[9].velocity[1] * delta_time/1000;
        CG.mat3x3Translate(this.models.slide3[9].translate12, tx_16, ty_16);
        if (this.models.slide3[9].radius <= 70) {
            CG.mat3x3Scale(this.models.slide3[9].scale7, 1.1, 1.1);
            this.models.slide3[9].radius = this.models.slide3[9].radius * 1.1;
            this.models.slide3[9].track7 = 0;
        }
        else if (this.models.slide3[9].radius >= 550) {
            CG.mat3x3Scale(this.models.slide3[9].scale7, 0.9, 0.9);
            this.models.slide3[9].radius = this.models.slide3[9].radius * 0.9;
            this.models.slide3[9].track7 = 1;
        }
        else {
            if (this.models.slide3[9].track7 == 1) {
                this.models.slide3[9].radius = this.models.slide3[9].radius * 0.9;
            }
            else if (this.models.slide3[9].track7 == 0) {
                this.models.slide3[9].radius = this.models.slide3[9].radius * 1.1;
            }
        }
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

        let color = [176, 245, 66, 255];
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
        
        // rotate about the origin
        let newVertices1 = [];
        for (let i=0; i<4; i++) {
            let v = Matrix.multiply([this.models.slide1[0].rotate, this.models.slide1[0].verticesAtOrigin[i]]);
            newVertices1.push(v);
        }
        this.models.slide1[0].verticesAtOrigin = newVertices1;
        // translate to the desired location
        let newVertices2 = [];
        for (let i=0; i<4; i++) {
            let v = Matrix.multiply([this.models.slide1[0].translate, newVertices1[i]]);
            newVertices2.push(v);
        }
        let color = [66, 158, 245, 255];
        this.drawConvexPolygon(newVertices2, color);




        // rotate about the origin
        let newVertices3 = [];
        for (let i=0; i<5; i++) {
            let v = Matrix.multiply([this.models.slide1[1].rotate1, this.models.slide1[1].verticesAtOrigin[i]]);
            newVertices3.push(v);
        }
        this.models.slide1[1].verticesAtOrigin = newVertices3;
        // translate to the desired location
        let newVertices4 = [];
        for (let i=0; i<5; i++) {
            let v = Matrix.multiply([this.models.slide1[1].translate1, newVertices3[i]]);
            newVertices4.push(v);
        }
        let color1 = [157, 204, 29, 255];
        this.drawConvexPolygon(newVertices4, color1);





        // rotate about the origin
        let newVertices5 = [];
        for (let i=0; i<3; i++) {
            let v = Matrix.multiply([this.models.slide1[2].rotate2, this.models.slide1[2].verticesAtOrigin[i]]);
            newVertices5.push(v);
        }
        this.models.slide1[2].verticesAtOrigin = newVertices5;
        // translate to the desired location
        let newVertices6 = [];
        for (let i=0; i<3; i++) {
            let v = Matrix.multiply([this.models.slide1[2].translate2, newVertices5[i]]);
            newVertices6.push(v);
        }
        let color2 = [229, 145, 255, 255];
        this.drawConvexPolygon(newVertices6, color2);
    }

    //
    drawSlide2() {
        // TODO: draw at least 2 polygons grow and shrink about their own centers
        //   - have each polygon grow / shrink different sizes
        //   - try at least 1 polygon that grows / shrinks non-uniformly in the x and y directions

        // scale
        let newVertices = [];
        let num_edges = 100;
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide2[0].scale, this.models.slide2[0].verticesAtOrigin[i]]);
            newVertices.push(v);
        }
        this.models.slide2[0].verticesAtOrigin = newVertices;
        // translate to the desired location
        let newVertices1 = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide2[0].translate3, newVertices[i]]);
            newVertices1.push(v);
        }
        let color = [191, 145, 255, 255];
        this.drawConvexPolygon(newVertices1, color);



        
        // scale
        let newVertices2 = [];
        for (let i=0; i<7; i++) {
            let v = Matrix.multiply([this.models.slide2[1].scale1, this.models.slide2[1].verticesAtOrigin1[i]]);
            newVertices2.push(v);
        }
        this.models.slide2[1].verticesAtOrigin1 = newVertices2;
        // translate to the desired location
        let newVertices3 = [];
        for (let i=0; i<7; i++) {
            let v = Matrix.multiply([this.models.slide2[1].translate4, newVertices2[i]]);
            newVertices3.push(v);
        }
        let color1 = [201, 235, 52, 255];
        this.drawConvexPolygon(newVertices3, color1);
    }

    //
    drawSlide3() {
        // TODO: get creative!
        //   - animation should involve all three basic transformation types
        //     (translation, scaling, and rotation)
        
        this.manyCircles();
        this.drawSlide0();

        let newVertices1 = [];
        for (let i=0; i<4; i++) {
            let v = Matrix.multiply([this.models.slide3[2].rotate3, this.models.slide3[2].verticesAtOrigin[i]]);
            this.models.slide3[2].velocity[1] = 100;
            newVertices1.push(v);
            this.drawConvexPolygon(newVertices1, [25,0,0,140]);
        }
        this.models.slide3[2].verticesAtOrigin = newVertices1;

        let newVertices2 = [];
        for (let i=0; i<4; i++) {
            this.models.slide3[2].velocity[1] = 100;
            let v = Matrix.multiply([this.models.slide3[2].translate7, newVertices1[i]]);
            newVertices2.push(v);
            this.drawConvexPolygon(newVertices2, [25,0,181,140]);
        }
        let color = [255, 128, 191, 255];
       this.drawConvexPolygon(newVertices1, color);
        

        //square 2
        let newVertices1a = [];

        for (let i=0; i<4; i++) {
            let v = Matrix.multiply([this.models.slide3[3].rotate4, this.models.slide3[3].verticesAtOrigin[i]]);
            this.models.slide3[3].velocity[1] = 100;
            newVertices1a.push(v);
            this.drawConvexPolygon(newVertices1a, [25,0,0,140]);
        }
        this.models.slide3[3].verticesAtOrigin = newVertices1a;

        let newVertices2a = [];
        for (let i=0; i<4; i++) {
            this.models.slide3[3].velocity[1] = 100;
            let v = Matrix.multiply([this.models.slide3[3].translate5, newVertices1a[i]]);
            newVertices2a.push(v);
            this.drawConvexPolygon(newVertices2a, [25,0,181,140]);
        }
        color = [255, 128, 191, 255];
        this.drawConvexPolygon(newVertices1a, color);










        // flower
        // stem
        let stemVertices = [
            CG.Vector3(580, 250, 1),
            CG.Vector3(610, 250, 1),
            CG.Vector3(610, 0, 1),
            CG.Vector3(580, 0, 1)
        ];
        let stemColor = [18, 181, 56, 255];
        this.drawConvexPolygon(stemVertices, stemColor);
        // leaf1
        let leaf1Vertices = [
            CG.Vector3(540, 200, 1),
            CG.Vector3(560, 170, 1),
            CG.Vector3(580, 100, 1),
            CG.Vector3(530, 150, 1)
        ];
        this.drawConvexPolygon(leaf1Vertices, stemColor);
        // leaf2
        let leaf2Vertices = [
            CG.Vector3(650, 100, 1),
            CG.Vector3(640, 70, 1),
            CG.Vector3(610, 40, 1),
            CG.Vector3(620, 80, 1)
        ];
        this.drawConvexPolygon(leaf2Vertices, stemColor);
        // leaf3
        let leaf3Vertices = [
            CG.Vector3(650, 220, 1),
            CG.Vector3(640, 200, 1),
            CG.Vector3(610, 170, 1),
            CG.Vector3(620, 210, 1)
        ];
        this.drawConvexPolygon(leaf3Vertices, stemColor);
        // center
        let flowerCenterVertices = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[4].scale2, this.models.slide3[4].verticesAtOrigin[i]]);
            flowerCenterVertices.push(v);
        }
        this.models.slide3[4].verticesAtOrigin = flowerCenterVertices;
        let flowerCenterVertices1 = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[4].translate6, flowerCenterVertices[i]]);
            flowerCenterVertices1.push(v);
        }
        let flowerCenterColor = [246, 255, 0, 255];
        this.drawConvexPolygon(flowerCenterVertices1, flowerCenterColor);
        // fetal1
        let petal1Vertices_temp = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[5].scale3, this.models.slide3[5].verticesAtOrigin[i]]);
            petal1Vertices_temp.push(v);
        }
        this.models.slide3[5].verticesAtOrigin = petal1Vertices_temp;
        let petal1Vertices = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[5].translate8, petal1Vertices_temp[i]]);
            petal1Vertices.push(v);
        }
        let petal1Color = [255, 0, 0, 255];
        this.drawConvexPolygon(petal1Vertices, petal1Color);
        // fetal2
        let petal2Vertices_temp = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[6].scale4, this.models.slide3[6].verticesAtOrigin[i]]);
            petal2Vertices_temp.push(v);
        }
        this.models.slide3[6].verticesAtOrigin = petal2Vertices_temp;
        let petal2Vertices = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[6].translate9, petal2Vertices_temp[i]]);
            petal2Vertices.push(v);
        }
        let petal2Color = [255, 140, 0, 255];
        this.drawConvexPolygon(petal2Vertices, petal2Color);
        // fetal3
        let petal3Vertices_temp = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[7].scale5, this.models.slide3[7].verticesAtOrigin[i]]);
            petal3Vertices_temp.push(v);
        }
        this.models.slide3[7].verticesAtOrigin = petal3Vertices_temp;
        let petal3Vertices = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[7].translate10, petal3Vertices_temp[i]]);
            petal3Vertices.push(v);
        }
        let petal3Color = [0, 255, 251, 255];
        this.drawConvexPolygon(petal3Vertices, petal3Color);
        // fetal4
        let petal4Vertices_temp = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[8].scale6, this.models.slide3[8].verticesAtOrigin[i]]);
            petal4Vertices_temp.push(v);
        }
        this.models.slide3[8].verticesAtOrigin = petal4Vertices_temp;
        let petal4Vertices = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[8].translate11, petal4Vertices_temp[i]]);
            petal4Vertices.push(v);
        }
        let petal4Color = [200, 128, 255, 255];
        this.drawConvexPolygon(petal4Vertices, petal4Color);
        // fetal5
        let petal5Vertices_temp = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[9].scale7, this.models.slide3[9].verticesAtOrigin[i]]);
            petal5Vertices_temp.push(v);
        }
        this.models.slide3[9].verticesAtOrigin = petal5Vertices_temp;
        let petal5Vertices = [];
        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[9].translate12, petal5Vertices_temp[i]]);
            petal5Vertices.push(v);
        }
        let petal5Color = [255, 128, 238, 255];
        this.drawConvexPolygon(petal5Vertices, petal5Color);
    }
    
    manyCircles(){ //helper function
        let newVertices = [];
        let color = [100, 40, 150, 140];

        for (let i=0; i<100; i++) {
            let v = Matrix.multiply([this.models.slide3[0].transform2, this.models.slide3[0].vertices[i]]);
            newVertices.push(v);
        }

        // set new center of the ball as it gets translated
        let newCenter = Matrix.multiply([this.models.slide3[0].transform2, this.models.slide3[0].center]);
        
        // did the ball hit a right/left edge?
        if (newCenter.values[0][0] + this.models.slide3[0].radius2 >= this.canvas.width) {
            this.models.slide3[0].velocity[0] = -100;
            this.drawConvexPolygon(newVertices, [25,186,181,140]);
        }
        if (newCenter.values[0][0] - this.models.slide3[0].radius2 <= 0) {
            this.models.slide3[0].velocity[0] = 100;
            this.drawConvexPolygon(newVertices, [25,186,181,140]);
        }
        // did the ball hit a bottom/top edge?
        if (newCenter.values[1][0] + this.models.slide3[0].radius2 >= this.canvas.height) {
            this.models.slide3[0].velocity[1] = -100;
            this.drawConvexPolygon(newVertices, [25,186,181,140]);
        }
        if (newCenter.values[1][0] - this.models.slide3[0].radius2 <= 0) {
            this.models.slide3[0].velocity[1] = 100;
            this.drawConvexPolygon(newVertices, [25,186,181,140]);
        }

        this.drawConvexPolygon(newVertices, color);
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
