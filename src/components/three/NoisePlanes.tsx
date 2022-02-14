import { VFC } from 'react';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { cnoise31 } from '../../modules/glsl';

export const NoisePlanes: VFC = () => {
	return (
		<group>
			<NoisePlane posZ={0.0} color={[0.62, 0.49, 0.45]} />
			<NoisePlane posZ={0.1} color={[0.91, 0.8, 0.59]} />
			<NoisePlane posZ={0.2} color={[0.54, 0.76, 0.75]} />
			<NoisePlane posZ={0.3} color={[0.61, 0.5, 0.47]} />
			<NoisePlane posZ={0.4} color={[0.84, 0.56, 0.47]} />
			<NoisePlane posZ={0.5} color={[0.91, 0.85, 0.69]} />
			<NoisePlane posZ={0.6} color={[0.88, 0.64, 0.49]} />
			<NoisePlane posZ={0.7} color={[0.6, 0.49, 0.46]} />
			<NoisePlane posZ={0.8} color={[0.91, 0.91, 0.85]} />
			<NoisePlane posZ={0.9} color={[0.9, 0.69, 0.49]} />
			<NoisePlane posZ={1.0} color={[0.84, 0.56, 0.47]} />
		</group>
	)
}

type NoisePlaneProps = {
	posZ: number
	color: [number, number, number]
}

const NoisePlane: VFC<NoisePlaneProps> = ({ posZ, color }) => {
	const shader: THREE.Shader = {
		uniforms: {
			u_time: { value: 0 },
			u_color: { value: color },
			u_scale: { value: 1.0 - posZ },
			u_shadowScale: { value: 1.0 - (posZ + 0.1) }
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader
	}

	useFrame(() => {
		shader.uniforms.u_time.value += 0.01
	})

	return (
		<Plane args={[3, 3]} position={[0, 0, posZ]}>
			<shaderMaterial args={[shader]} transparent side={THREE.DoubleSide} />
		</Plane>
	)
}

// ========================================================
// shader

const vertexShader = `
varying vec2 v_uv;
varying vec3 v_eye;

void main() {
  v_uv = uv;
  v_eye = normalize(-cameraPosition);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragmentShader = `
uniform float u_time;
uniform vec3 u_color;
uniform float u_scale;
uniform float u_shadowScale;
varying vec2 v_uv;
varying vec3 v_eye;

${cnoise31}

float _smoothstep(float value, float offset) {
  float start = -0.3;
  float _offset = pow(offset, 0.8);
  return 1.0 - smoothstep(start + _offset, start + 0.001 + _offset, value);
}

void main() {
  vec3 seed = vec3(v_uv.x, v_uv.y, 1.0);
  seed *= vec3(4.0, 4.0, 1.0);
  seed += u_time * 0.2;
  float noise = cnoise31(seed);
  float alpha = _smoothstep(noise, u_scale);

  vec3 color = u_color;
  if(0.0 <= u_shadowScale) {
    noise = cnoise31(seed + v_eye * vec3(0.3, 0.3, 0.0));
    float shadow = _smoothstep(noise, u_shadowScale);
    color -= shadow * 0.5;
  }

  gl_FragColor = vec4(color, alpha);
}
`
