precision highp float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

#define time iTime

const int iterationTime1 = 20;
const float scale = 6.;

const float velocity_x = 0.1;
const float velocity_y = 0.2;

const float mode_2_speed = 2.5;
const float mode_1_detail = 200.;
const float mode_1_twist = 50.;

const vec3 luma = vec3(0.2126, 0.7152, 0.0722);

float f(in vec2 p) {
    return sin(p.x + sin(p.y + time * velocity_x)) * sin(p.y * p.x * 0.1 + time * velocity_y);
}

struct Field {
    vec2 vel;
    vec2 pos;
};

//---------------Field to visualize defined here-----------------
Field field(in vec2 p) {
    Field field;
    vec2 ep = vec2(0.05, 0.);
    vec2 rz = vec2(0);
    //# centered grid sampling
    for(int i = 0; i < iterationTime1; i++) {
        float t0 = f(p);
        float t1 = f(p + ep.xy);
        float t2 = f(p + ep.yx);
        vec2 g = vec2((t1 - t0), (t2 - t0)) / ep.xx;
        vec2 t = vec2(-g.y, g.x);

        //# need update 'p' for next iteration,but give it some change.
        p += (mode_1_twist * 0.01) * t + g * (1. / mode_1_detail);
        p.x = p.x + sin(time * mode_2_speed / 10.) / 10.;
        p.y = p.y + cos(time * mode_2_speed / 10.) / 10.;
        rz = g; 
    }
    field.vel = rz;
    return field;
}

vec3 getRGB(in Field fld) {
    vec2 p = fld.vel;
    vec3 origCol = vec3(p * 0.3 + 0.6, 1.5);
    return origCol;
}

vec3 hueShift(vec3 color, float hue) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hue);
    return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = fragCoord.xy / iResolution.xy - 0.5;
    p.x *= iResolution.x/iResolution.y;
    p *= scale;
    
    vec3 col;
    
    Field fld = field(p);
    col = getRGB(fld);    
    col.r *= 0.3;
    col.g *= 1.3;
    col.b *= 2.;
    col = hueShift(col, 0.05);
    // convert to grayscale
    float gray = dot(col, luma);

    // color with a tri-tone effect
    vec3 highlights = vec3(0.7922, 1.0, 1.0);
    vec3 midtones = vec3(0.5412, 0.7569, 1.0);
    vec3 shadows = vec3(0.898, 0.8157, 1.0);

    col = mix(col,  shadows, smoothstep(0.0, .8, gray));
    col = mix(col, highlights, smoothstep(0.5, 0.6, gray));
    col = mix(col, midtones, smoothstep(0.6, 1., gray));

    fragColor = vec4(col, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}