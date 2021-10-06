/**
 * @author tobias.frei@unic.com
 *
 * @module glsl uniform demo
 *
 */

import { Pane } from 'tweakpane';

// @ts-ignore
import vertexWobble from '@scripts/glsl/demo.glsl.vert';
// @ts-ignore
import fragmentWobble from '@scripts/glsl/demo.glsl.frag';

// Parameter object
let PARAMS: any;

const DEFINE_FPS = 35;
const DEFINE_RES = 800;
const DEFINE_RES2 = 800;
const deviceRatio = 1;

const resX = DEFINE_RES * deviceRatio,
      resY = DEFINE_RES2 * deviceRatio,
      verts = [-1, 1, -1, -1, 1, -1, 1, 1];

let canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext,
    fpsInterval: number,
    twodContext: CanvasRenderingContext2D,
    now: DOMHighResTimeStamp,
    then: DOMHighResTimeStamp,
    elapsed: DOMHighResTimeStamp,
    resFrame1: Promise<string>;

const imageDatas: ImageData[] = [],
      textures: any[] = [],
      textureLocationDarvin: WebGLUniformLocation[] | any[] = [];

// webgl uniforms
let pos: any,
    program: WebGLProgram,
    buffer: any,
    ut: WebGLUniformLocation | null,
    ures: WebGLUniformLocation | null,
    ucenter: WebGLUniformLocation | null,
    ushake: WebGLUniformLocation | null,
    upulse: WebGLUniformLocation | null,
    ublink: WebGLUniformLocation | null,
    ulight: WebGLUniformLocation | null;

const createShader = (type: number, source: string) => {
    const shader = gl.createShader(type);

    if (!shader || !source) {
      console.error('> cannot create shader');
      return;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      gl.deleteShader(shader);
      return false;
    }
    return shader;
  },

  createProgram = (vertexShaderString: string, fragmentShaderString: string) => {
    // Setup Vertext/Fragment Shader functions
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderString);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderString);

    // Setup Program and Attach Shader functions
    const newProgram: WebGLProgram | null = gl.createProgram();

    if (newProgram && vertexShader && fragmentShader) {
      gl.attachShader(newProgram, vertexShader);
      gl.attachShader(newProgram, fragmentShader);
      gl.linkProgram(newProgram);
    } else {
      console.error('#dv> webgl program error');
    }

    return newProgram;
  },

  createGraphics = (vertexShader: string | null, fragmentShader: string | null) => {
    if (!vertexShader || !fragmentShader) {
      console.error('> shader missing');
      return;
    }

    createTextureObject(imageDatas);

    // Create the Program //
    const newProgram = createProgram(vertexShader, fragmentShader);
    if (!newProgram) {
      console.error('#dv> webgl create graphics error');
      return;
    }
    program = newProgram;

    // Create and Bind buffer //
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(verts),
      gl.STATIC_DRAW
    );

    pos = gl.getAttribLocation(program, 'pos');

    gl.vertexAttribPointer(
      pos,
      2,              // size: 2 components per iteration
      gl.FLOAT,       // type: the data is 32bit floats
      false,           // normalize: don't normalize the data
      0,              // stride: 0 = move forward size * sizeof(type) each iteration to get the next position
      0               // start at the beginning of the buffer
    );

    gl.enableVertexAttribArray(pos);

    importProgram();
  },

  updateUniforms = (time: DOMHighResTimeStamp): Promise<string> => {
    return new Promise(resolve => {
      gl.useProgram(program);

      importUniforms(time);

      gl.drawArrays(
        gl.TRIANGLE_FAN, // primitiveType
        0,                    // Offset
        4                     // Count
      );

      resolve('resolved');
    });
  },

  importProgram = () => {
    if (program) {
      ut = gl.getUniformLocation(program, 'time');
      ures = gl.getUniformLocation(program, 'resolution');
      ucenter = gl.getUniformLocation(program, 'center');
      ushake = gl.getUniformLocation(program, 'shake');
      upulse = gl.getUniformLocation(program, 'pulse');
      ublink = gl.getUniformLocation(program, 'blink');
      ulight = gl.getUniformLocation(program, 'light');
    }
    imageDatas.forEach((_imgData, i) => {
      const temp = gl.getUniformLocation(program, 'uTexture' + i);
      if (temp) {
        textureLocationDarvin.push(temp);
      }
    });
  },

  importUniforms = (time: DOMHighResTimeStamp) => {
    gl.uniform1f(ut, time / 1000);
    gl.uniform2f(ucenter, ((((window.innerWidth) / 2)) / (resX / 100) / 100) * deviceRatio, ( (((window.innerHeight) / 2)) / (resY / 100) / 100) * deviceRatio);
    gl.uniform2f(ures, resX, resY);

    gl.uniform1i(ushake, PARAMS.shake);
    gl.uniform1i(upulse, PARAMS.pulse);
    gl.uniform1i(ublink, PARAMS.blink);
    gl.uniform1f(ulight, PARAMS.light);

   // Set each texture unit to use a particular texture.
   textureLocationDarvin.forEach((textureLocation, i) => {
      gl.uniform1i(textureLocation, i);  // texture unit 0
      gl.activeTexture(gl['TEXTURE' + i]);
      gl.bindTexture(gl.TEXTURE_2D, textures[i]);
    });
  },

  resizeCanvasToDisplaySize = (): boolean => {
    const glCanvas = <HTMLCanvasElement>gl.canvas;
    const width = glCanvas.clientWidth * deviceRatio;
    const height = glCanvas.clientHeight * deviceRatio;
    const needResize = glCanvas.width !== width ||
      glCanvas.height !== height;
    if (needResize) {
      glCanvas.width = width;
      glCanvas.height = height;
    }
    return needResize;
  },

  startRenderLoop = (fps: number) => {
    fpsInterval = 1000 / fps;
    then = Date.now();
    renderLoop(then);
  },

  renderLoop = async (time: DOMHighResTimeStamp) => {
    requestAnimationFrame(renderLoop);
    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);

      // begin call and store promise without waiting
      resFrame1 = updateUniforms(time);

      // @ts-ignore
      const actualFrame = [await resFrame1];
    }
  },

  startShaderItems = ({vertex, fragment}: any) => {
    createGraphics(vertex, fragment);
  },

  initCanvas = () => {
    resizeCanvasToDisplaySize();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    startRenderLoop(DEFINE_FPS);
  },

  resize = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resizeCanvasToDisplaySize();

        requestAnimationFrame(() => {
          gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        });
      });
    });
  },

  addDomListener = () => {
    window.addEventListener('resize', resize);
  },

  removeDomListener = () => {
    window.removeEventListener('resize', resize);
  },

  setImageData = (svgPathsArray: any[]) => {
    const canvas2D = <HTMLCanvasElement> document.getElementById('background-canvas2d');
    twodContext = <CanvasRenderingContext2D>canvas2D.getContext('2d');

    svgPathsArray.forEach((svgPaths) => {
      twodContext.clearRect(0, 0, canvas2D.width, canvas2D.height);

      svgPaths.forEach((svgPathNode) => {
        twodContext.fill(new Path2D(svgPathNode));
      });

      const imageData = twodContext.getImageData(0, 0, DEFINE_RES, DEFINE_RES2);
      imageDatas.push(imageData);
    });
  },

  createTextureObject = (imgDatas: ImageData[]) => {
    // create 2 textures
    for (let i = 0; i < imgDatas.length; i++) {
      const texture: any = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Upload the image into the texture.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgDatas[i]);

      // add the texture to the array of textures.
      textures.push(texture);
    }
  },

  addTweakPane = () => {
    // get settings from storage
    const stor = localStorage.getItem('darvindoc-params');
    if (stor) {
      try {
        PARAMS = JSON.parse(stor);
      } catch {
        PARAMS = {
          light: -30.0,
          pulse: true,
          shake: false,
          blink: true
        };
      }
    } else {
      PARAMS = {
        light: -30.0,
        pulse: true,
        shake: false,
        blink: true
      };
    }

    // params panel
    const pane = new Pane();
    pane.addInput(PARAMS, 'pulse').on('change', () => {
      localStorage.setItem('darvindoc-params', JSON.stringify(PARAMS));
    });
    pane.addInput(PARAMS, 'shake').on('change', () => {
      localStorage.setItem('darvindoc-params', JSON.stringify(PARAMS));
    });
    pane.addInput(PARAMS, 'blink').on('change', () => {
      localStorage.setItem('darvindoc-params', JSON.stringify(PARAMS));
    });
    pane.addInput(PARAMS, 'light', {
      min: -50.,
      max: -1.,
    }).on('change', () => {
      localStorage.setItem('darvindoc-params', JSON.stringify(PARAMS));
    });
  };


/**
 * Change framerate
 *
 * @param {number} fps - Set new fps e.g 55
 */
const setFps = (fps: number) => {
  fpsInterval = 1000 / fps;
};

/**
 * destroy all instances
 *
 */
const destroy = () => {
  removeDomListener();
};

/**
 * Initialize module
 *
 * @return {object} Instance of created module.
 * @param webgl boolean that defines wheather to use webgl or not
 */
const init = () => {
  const svgTetureObjects: NodeListOf<HTMLElement> | null = document.querySelectorAll('svg.texture-import');
  const svgTexturePathStrings: any[] = [];

  if (!svgTetureObjects) {
    console.error('> webgl: missing svg icons');
    return;
  }

  // import texture paths
  svgTetureObjects.forEach((svgTextureObject) => {
    const svgPaths: NodeListOf<HTMLElement> | null = svgTextureObject.querySelectorAll('.darvinIconPath');
    const svgPathsString: any[] = [];

    svgPaths.forEach((svgPathNode) => {
      let svgPath: string | undefined;
      // tslint:disable-next-line:no-non-null-assertion
      svgPath = svgPathNode!.getAttribute('d') || undefined;
      svgPathsString.push(svgPath);
    });

    svgTexturePathStrings.push(svgPathsString);
  });

  // init canvas
  canvas = <HTMLCanvasElement>document.getElementById('background-canvas');
  if (!canvas) {
    console.error('#dv> no canvas found');
    return;
  }

  const glContext = canvas.getContext('webgl', {
    preserveDrawingBuffer: false
  });

  if (!glContext) {
    console.error('#dv> error on webgl context');
    return;
  }

  gl = glContext;

  setImageData(svgTexturePathStrings);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  startShaderItems({
    vertex: vertexWobble,
    fragment: fragmentWobble
  });

  initCanvas();

  addDomListener();
  addTweakPane();
};

export default {
  init,
  destroy,
  setFps
};
