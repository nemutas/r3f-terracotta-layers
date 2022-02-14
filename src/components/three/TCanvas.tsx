import React, { VFC } from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { NoisePlanes } from './NoisePlanes';

export const TCanvas: VFC = () => {
	return (
		<Canvas
			camera={{
				position: [0, 0, 5],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}>
			{/* scene */}
			<color attach="background" args={['#987452']} />
			{/* camera controller */}
			<OrbitControls
				attach="orbitControls"
				enablePan={false}
				minPolarAngle={0.5 * Math.PI - Math.PI / 6}
				maxPolarAngle={0.5 * Math.PI + Math.PI / 6}
				minAzimuthAngle={2 * Math.PI - Math.PI / 6}
				maxAzimuthAngle={2 * Math.PI + Math.PI / 6}
			/>
			{/* objects */}
			<NoisePlanes />
			{/* helper */}
			<Stats />
		</Canvas>
	)
}
