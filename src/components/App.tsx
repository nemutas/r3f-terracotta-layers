import React, { VFC } from 'react';
import { css } from '@emotion/css';
import { LinkIconButton } from './LinkIconButton';
import { TCanvas } from './three/TCanvas';

export const App: VFC = () => {
	return (
		<div className={styles.container}>
			<TCanvas />
			<LinkIconButton
				imagePath="/assets/icons/github.svg"
				linkPath="https://github.com/nemutas/r3f-terracotta-layers"
			/>
		</div>
	)
}

const styles = {
	container: css`
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	`
}
