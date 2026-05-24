// Vertex shader: Creates gravitational distortion effect
export const blackHoleVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;

  varying vec2 vUv;
  varying float vDistortion;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Calculate distance from center
    float dist = length(pos.xy);

    // Gravitational pull effect - space bending
    float pull = 1.0 / (1.0 + dist * 3.0);

    // Apply distortion to z-axis (creates depth)
    pos.z -= pull * 0.8;

    // Subtle rotation based on time
    float angle = uTime * 0.05 * (1.0 - pull * 0.5);
    float s = sin(angle);
    float c = cos(angle);
    mat2 rotation = mat2(c, -s, s, c);
    pos.xy = rotation * pos.xy;

    // Mouse interaction - subtle parallax
    vec2 mouseOffset = (uMouse - 0.5) * 0.1 * pull;
    pos.x += mouseOffset.x;
    pos.y += mouseOffset.y;

    // Pass distortion to fragment shader
    vDistortion = pull;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader: Creates gravitational lensing effect
export const blackHoleFragmentShader = `
  uniform float uTime;

  varying vec2 vUv;
  varying float vDistortion;

  void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);

    // Gravitational lensing - light bending
    float lensing = 1.0 / (1.0 + dist * 12.0);

    // Base colors - near-black to deep gray
    vec3 darkColor = vec3(0.04, 0.04, 0.04);
    vec3 lightColor = vec3(0.12, 0.12, 0.12);

    // Create gradient based on lensing
    vec3 color = mix(darkColor, lightColor, lensing * 0.6);

    // Add subtle stone accent at the edges
    float edge = smoothstep(0.3, 0.5, dist);
    vec3 accent = vec3(0.54, 0.52, 0.48) * 0.15;
    color = mix(color, color + accent, edge * (1.0 - lensing));

    // Subtle time-based variation
    float pulse = sin(uTime * 0.3) * 0.03;
    color += pulse * lensing * 0.5;

    // Fade edges
    float alpha = smoothstep(0.6, 0.3, dist);

    gl_FragColor = vec4(color, alpha);
  }
`;

// Accretion disk shader
export const accretionDiskVertexShader = `
  uniform float uTime;

  varying vec2 vUv;
  varying float vDist;

  void main() {
    vUv = uv;

    vec3 pos = position;
    vDist = length(pos.xy);

    // Rotate the disk
    float angle = uTime * 0.1;
    float s = sin(angle);
    float c = cos(angle);
    mat2 rotation = mat2(c, -s, s, c);
    pos.xy = rotation * pos.xy;

    // Subtle wave motion
    pos.z += sin(uTime * 0.5 + vDist * 10.0) * 0.02;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const accretionDiskFragmentShader = `
  uniform float uTime;

  varying vec2 vUv;
  varying float vDist;

  void main() {
    // Create ring pattern
    float ring = sin(vDist * 40.0 - uTime * 0.5) * 0.5 + 0.5;

    // Fade at edges
    float alpha = smoothstep(0.2, 0.3, vDist) * smoothstep(0.5, 0.4, vDist);

    // Subtle stone color
    vec3 color = vec3(0.54, 0.52, 0.48) * ring * 0.2;

    gl_FragColor = vec4(color, alpha * 0.5);
  }
`;
