/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import useInterval from '@use-it/interval';

// Constants
const VALID_CHARS = `0x047C297fb2fFB8e4e27d47b7dCc9cFC487437432`;
const STREAM_MUTATION_ODDS = 0.05;

const MIN_STREAM_SIZE = 3;
const MAX_STREAM_SIZE = 20;

const MIN_INTERVAL_DELAY = 200;
const MAX_INTERVAL_DELAY = 300;

const MIN_DELAY_BETWEEN_STREAMS = 0;
const MAX_DELAY_BETWEEN_STREAMS = 500;

const getRandInRange = (min, max) =>
	Math.floor(Math.random() * (max - min)) + min;

const getRandChar = () =>
	VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const getRandStream = () =>
	new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE))
		.fill()
		.map(_ => getRandChar());

const getMutatedStream = stream => {
	const newStream = [];
	for (let i = 1; i < stream.length; i++) {
		if (Math.random() < STREAM_MUTATION_ODDS) {
			newStream.push(getRandChar());
		} else {
			newStream.push(stream[i]);
		}
	}
	newStream.push(getRandChar());
	return newStream;
};

const RainStream = props => {
	const [stream, setStream] = useState(getRandStream());
	const [topPadding, setTopPadding] = useState(stream.length * -50);
	const [intervalDelay, setIntervalDelay] = useState(null);

	// Initialize intervalDelay
	useEffect(() => {
		setTimeout(() => {
			setIntervalDelay(getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY));
		}, getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS));
	}, []);

	useInterval(() => {
		if (!props.height) return;

		if (!intervalDelay) return;

		// If stream is off the screen, reset it after timeout
		if (topPadding > props.height) {
			setStream([]);
			const newStream = getRandStream();
			setStream(newStream);
			setTopPadding(newStream.length * -30);
			setIntervalDelay(null);
			setTimeout(
				() =>
					setIntervalDelay(
						getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY),
					),
				getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS),
			);
		} else {
			setTopPadding(topPadding + 31);
		}
		// setStream(stream => [...stream.slice(1, stream.length), getRandChar()]);
		setStream(getMutatedStream);
	}, intervalDelay);

	return (
		<div
			style={{
				fontFamily: 'Overpass Mono',
				color: 'rgba(200, 0, 110, 1)',
				writingMode: 'vertical-rl',
				textOrientation: 'upright',
				userSelect: 'none',
				whiteSpace: 'nowrap',
				marginTop: topPadding,
				marginLeft: 0,
				marginRight: 0,
				textShadow: '0px 0px 0px rgba(200, 0, 110, 0)', //rgba(200, 0, 110, .1) rgba(130, 71, 229, 1)
				fontSize: 24,
				fontWeight: '100',
			}}>
			{stream.map((char, index) => (
				<a
					style={{
						marginTop: 0,
						// Reduce opacity for last chars
						opacity: index < 6 ? 1 + index * 1 : 1,  // opacity: index < 6 ? 0.1 + index * 0.15 : 1, 
						color: index === stream.length - 1 ? 'rgba(255, 0, 130, 1)' : undefined,
						textShadow:
							index === stream.length - 1
								? '0px 0px 0px rgba(255, 0, 130, 0)'
								: undefined,
					}}>
					{char}
				</a>
			))}
		</div>
	);
};

const MatrixRain = props => {
	const containerRef = useRef(null);
	const [containerSize, setContainerSize] = useState(null); // ?{width, height}

	useEffect(() => {
		const boundingClientRect = containerRef.current.getBoundingClientRect();
		setContainerSize({
			width: boundingClientRect.width,
			height: boundingClientRect.height,
		});
	}, []);

	const streamCount = containerSize ? Math.floor(containerSize.width / 26) : 0;

	return (
		<div
			style={{
				background: 'black',
				position: 'fixed',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				overflow: 'ignore',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
			}}
			ref={containerRef}>
			{new Array(streamCount).fill().map(_ => (
				<RainStream height={containerSize?.height} />
			))}
		</div>
	);
};

export default MatrixRain;