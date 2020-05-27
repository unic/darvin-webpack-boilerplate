#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 center;
vec3 coordinates;

float uPosButton = 0.05;

uniform bool shake;
uniform bool pulse;
uniform bool blink;
uniform float light;

uniform sampler2D uTexture0;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uTexture3;
uniform sampler2D uTexture4;
uniform sampler2D uTexture5;
uniform sampler2D uTexture6;
uniform sampler2D uTexture7;
uniform sampler2D uTexture8;
uniform sampler2D uTexture9;
uniform sampler2D uTexture10;
uniform sampler2D uTexture11;
uniform sampler2D uTexture12;
uniform sampler2D uTexture13;

vec3 iResolution = vec3(resolution, 1.0);
float iTime = time;

precision highp float;

// -> * next functions partly based on srtuss shadertoy *
vec2 rotate(vec2 p, float a)
{
	return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
}

float box(vec2 p, vec2 b)
{
	vec2 d = abs(p) - b;
	return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

#define aav (4.0 / iResolution.y)
void button(out vec4 bcol, inout vec3 acol, vec2 uv, float i1, vec3 selcol)
{
	float v; vec3 col;
	v = box(uv, vec2(0.1)) - 0.05;
	float l = length(uv);
	float shd = exp(-10.0 * max(v, 0.0));
	col = vec3(exp(l * -8.0) * 0.3 + 0.2);
	col *= 1.0 - vec3(exp(-100.0 * abs(v))) * 0.3;
	v = smoothstep(aav, 0.0, v);
	bcol = mix(vec4(0.0, 0.0, 0.0, shd * 0.5), vec4(col, 1.0), v);
	col = selcol * exp(light * l * l) * 0.5 * i1;
	acol = blink ? acol + col : acol;
}

vec3 sun = normalize(vec3(-0.2, 0.5, 0.5));

float hash1(float x)
{
	return fract(sin(x * 11.1753) * 192652.37862);
}

float nse1(float x)
{
	float fl = floor(x);
	return mix(hash1(fl), hash1(fl + 1.0), smoothstep(0.0, 1.0, fract(x)));
}

float bf(float t)
{
	float v = 0.04;
	return exp(t * -30.0) + smoothstep(0.25 + v, 0.25 - v, abs(t * 2.0 - 1.0));
}

#define ITS 7

vec2 circuit(vec3 p)
{
	p = mod(p, 2.0) - 1.0;
	float w = 1e38;
	vec3 cut = vec3(1.0, 0.0, 0.0);
	vec3 e1 = vec3(-1.0);
	vec3 e2 = vec3(1.0);
	float rnd = 0.23;
	float pos, plane, cur;
	float fact = 0.9;
	float j = 0.0;
	for(int i = 0; i < ITS; i ++)
	{
		pos = mix(dot(e1, cut), dot(e2, cut), (rnd - 0.5) * fact + 0.5);
		plane = dot(p, cut) - pos;
		if(plane > 0.0)
		{
			e1 = mix(e1, vec3(pos), cut);
			rnd = fract(rnd * 19827.5719);
			cut = cut.yzx;
		}
		else
		{
			e2 = mix(e2, vec3(pos), cut);
			rnd = fract(rnd * 5827.5719);
			cut = cut.zxy;
		}
		j += step(rnd, 0.2);
		w = min(w, abs(plane));
	}
	return vec2(j / float(ITS - 1), w);
}
// -> * end functions based on srtuss shadertoy *

vec3 icon(vec3 col, sampler2D texture, vec2 pIcon, vec2 pTranslate, float angle, vec3 mixColor, float colorAngle, vec3 pCoordinates, float mixVal, float i1) {
  mat3 transform = mat3(pIcon.x * cos(angle), pIcon.x * sin(angle), 0.0, -pIcon.y * sin(angle), pIcon.y * cos(angle), 0.0, - 0.5 * pIcon.x * cos(angle) + 0.5 * pIcon.y * sin(angle) - 0.5 * pTranslate.x + 0.5, - 0.5 * pIcon.x * sin(angle) - 0.5 * pIcon.y * cos(angle) - 0.5 * pTranslate.y + 0.5, 1.);
  vec3 desiredColor = mix(col, mixColor, smoothstep((transform * pCoordinates).x - pIcon.x * cos(colorAngle), - pIcon.y + (transform * pCoordinates).y, mixVal));
  vec4 icon = texture2D(texture, (transform * pCoordinates).xy);

  icon.rgb = 1. - desiredColor;
  icon.xyz *= icon.xyz * icon.w;

  col.xyz *= 1. - icon.xyz;

  return col;
}

vec3 iconshadow(vec3 col, sampler2D texture, vec2 pIcon, vec2 pTranslate, float angle, vec3 mixColor, float colorAngle, vec3 pCoordinates, float mixVal, float i1) {
  mat3 transform = mat3(pIcon.x * cos(angle), pIcon.x * sin(angle), 0.0, -pIcon.y * sin(angle), pIcon.y * cos(angle), 0.0, - 0.5 * pIcon.x * cos(angle) + 0.5 * pIcon.y * sin(angle) - 0.5 * pTranslate.x + 0.5, - 0.5 * pIcon.x * sin(angle) - 0.5 * pIcon.y * cos(angle) - 0.5 * pTranslate.y + 0.5, 1.);
  vec3 desiredColor = mix(col, mixColor, smoothstep((transform * pCoordinates).x - pIcon.x * cos(colorAngle), - pIcon.y + (transform * pCoordinates).y, mixVal));
  vec4 icon = texture2D(texture, (transform * pCoordinates).xy);

  icon.rgb = desiredColor;
  icon.xyz *= icon.xyz * icon.w;

  col.xyz += icon.xyz;

  return col;
}

vec3 pixel(vec2 p, float time, float ct)
{
	float te = ct * 9.0 / 16.0;
	float ll = dot(p, p);

  	// image pulsing
	p = pulse ? (p * 1.0 - cos((te + 0.75) * 6.283185307179586476925286766559) * 0.01) : p;

	vec2 pp = p;

    // image rotate
	p = pulse ? rotate(p, sin(time * 0.1) * 0.1 + nse1(time * 0.2) * 0.0) : p;

    //tile size
	float r = 1.5;
	p = mod(p - r, r * 2.0) - r;

    // image offset
	p.x += 0.6;

	float i = 1.;
	float i1 = bf(fract(0.80 + te));
	float i2 = bf(fract(0.60 + te));
	float i3 = bf(fract(0.40 + te));
	float i4 = bf(fract(0.20 + te));
	float i5 = bf(fract(0.0 + te));
	float s = time * 50.; // 50.0;

    // shaking
	vec2 shk = shake ? (vec2(nse1(s), nse1(s + 11.0)) * 2.0 - 1.0) * exp(-5.0 * fract(te * 4.0)) * 0.1 : vec2(0);
	pp += shk;
	p += shk;

	vec3 col = vec3(0.1);

    // panel lines
	s = 0.232;
	float c = smoothstep(aav, 0.0, circuit(vec3(p, 0.1) * s).y / s - 0.001);
	col += vec3(c) * 0.05;

	vec4 bcol; vec3 acol = vec3(0.0);
	button(bcol, acol, p, i, vec3(0.0863, 1.0, 0.4667));
	col = mix(col, bcol.xyz, bcol.w);
  	col = icon(col, uTexture1, vec2(0.7, -0.7), vec2(-12.25, -12.25), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p.x, p.y, 0.01), 0.01, i);

	vec2 p2 = p - vec2(0.4, 0.0);
	button(bcol, acol, p2, i2, vec3(1.0, 0.651, 0.0863));
	col = mix(col, bcol.xyz, bcol.w);
	col = icon(col, uTexture2, vec2(0.7, -0.7), vec2(-12.25, -12.25), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p2.x, p2.y, 0.01), 0.01, i2);

	vec2 p3 = p - vec2(0.8, 0.0);
	button(bcol, acol, p3, i3, vec3(1.0, 0.0863, 1.0));
	col = mix(col, bcol.xyz, bcol.w);
	col = icon(col, uTexture3, vec2(0.7, -0.7), vec2(-12.25, -12.25), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p3.x, p3.y, 0.01), 0.01, i3);

	vec2 p4 = p - vec2(1.2, 0.0);
	button(bcol, acol, p4, i4, vec3(1.0, 0.9843, 0.0));
	col = mix(col, bcol.xyz, bcol.w);
	col = icon(col, uTexture4, vec2(0.7, -0.7), vec2(-10.75, -11.), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p4.x, p4.y, 0.01), 0.01, i4);

  	vec2 p5 = p - vec2(0.4, -0.4);
	button(bcol, acol, p5, i3, vec3(0.6784, 1.0, 0.0863));
	col = mix(col, bcol.xyz, bcol.w);
  	col = icon(col, uTexture5, vec2(0.65, -0.65), vec2(-12.25, -11.), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p5.x, p5.y, 0.01), 0.01, i);

	vec2 p6 = p - vec2(0.4, 0.4);
	button(bcol, acol, p6, i3, vec3(0.2549, 0.0863, 1.0));
	col = mix(col, bcol.xyz, bcol.w);
	col = icon(col, uTexture6, vec2(0.7, -0.7), vec2(-13.5, -12.), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p6.x, p6.y, 0.01), 0.01, i2);

	vec2 p7 = p - vec2(0.4, 0.8);
	button(bcol, acol, p7, i4, vec3(1.0, 0.0863, 0.0863));
	col = mix(col, bcol.xyz, bcol.w);
	col = icon(col, uTexture7, vec2(0.8, -0.8), vec2(-14.5, -14.5), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p7.x, p7.y, 0.01), 0.01, i3);

	vec2 p8 = p - vec2(0.4, -0.8);
	button(bcol, acol, p8, i4, vec3(0.7882, 0.0863, 1.0));
	col = mix(col, bcol.xyz, bcol.w);
	col = icon(col, uTexture8, vec2(0.85, -0.85), vec2(-15., -16.), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p8.x, p8.y, 0.01), 0.01, i4);

	vec2 p9 = p - vec2(0.8, -0.4);
	button(bcol, acol, p9, i4, vec3(0.1176, 1.0, 0.0863));
	col = mix(col, bcol.xyz, bcol.w);
	col = icon(col, uTexture9, vec2(0.575, -0.575), vec2(-12.25, -9.), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p9.x, p9.y, 0.01), 0.01, i4);

	vec2 p10 = p - vec2(0.8, 0.4);
	button(bcol, acol, p10, i4, vec3(0.0863, 0.4824, 1.0));
	col = mix(col, bcol.xyz, bcol.w);
	col = icon(col, uTexture10, vec2(0.7, -0.7), vec2(-14.5, -11.5), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p10.x, p10.y, 0.01), 0.01, i4);

	vec2 p11 = p - vec2(1.2, 0.4);
	button(bcol, acol, p11, i5, vec3(1.0, 0.1922, 0.0863));
	col = mix(col, bcol.xyz, bcol.w);
	col = icon(col, uTexture11, vec2(0.55, -0.55), vec2(-11.75, -5.5), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p11.x, p11.y, 0.01), 0.01, i5);

	vec2 p12 = p - vec2(1.2, -0.4);
	button(bcol, acol, p12, i5, vec3(1.0, 0.4196, 0.0863));
	col = mix(col, bcol.xyz, bcol.w);
	col = icon(col, uTexture12, vec2(0.7, -0.7), vec2(-14.5, -11.5), radians(0.), vec3(0.1647, 0.1765, 0.1804), radians(30.), vec3(p12.x, p12.y, 0.01), 0.01, i5);

	// darvin icon
	col = iconshadow(col, uTexture0, vec2(1., -1.), vec2(-45., -60.), radians(0.), vec3(0.3529, 0.4863, 0.5333), radians(30.), vec3(p.x, p.y, 0.01), 0.01, 0.1);

	col += acol;
	col *= exp((length(pp) - 0.5) * -1.0) * 0.5 + 0.5;
	col = pow(col, vec3(1.2, 1.1, 1.0) * 2.0) * 4.0;
	col = pow(col, vec3(1.0 / 2.2));

	return col;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
	vec2 uvn = 1.75 * uv - 1.0;
	uvn.x *= iResolution.x / iResolution.y;

	vec3 col = vec3(0.0, 0.0, 0.0);
	float j = 0.008;
	col  = pixel(uvn, iTime, iTime);

	fragColor = vec4(col, 1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
