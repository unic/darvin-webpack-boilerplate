/**
 * @author tobias.frei@unic.com
 *
 * vertex shader for shadow and button
 */

attribute vec4 pos;

void main() {
  gl_Position = vec4(pos.x, pos.y, pos.z, pos.w);
}
