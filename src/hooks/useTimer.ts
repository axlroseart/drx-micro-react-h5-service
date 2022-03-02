import { useCallback, useEffect, useRef, useState } from 'react';

import useAppVisibleStatus from './useAppVisibleStatus';

export interface StartCounterOptions {
	interval: number;
}

export type UseTimerIn = (dep: boolean) => {
	countFocus: number;
	countBlur: number;
	status: boolean;
};

const useTimer: UseTimerIn = (dep) => {
	const { appVisible, appFocus } = useAppVisibleStatus();
	const [countFocus, setCountFocus] = useState<number>(0);
	const [countBlur, setCountBlur] = useState<number>(0);

	const countRefFocus = useRef<number>(0);
	const countRefBlur = useRef<number>(0);
	const [status, setStatus] = useState<boolean>(false);
	const timerRef = useRef<any>();

	const startCounter = useCallback(
		({ interval = 1000 }): void => {
			setStatus(true);
			clearInterval(timerRef.current);
			timerRef.current = setInterval(() => {
				if (!appVisible) {
					return;
				}
				if (!appFocus) {
					// vantage is visible but out of focus
					countRefBlur.current += 1;
					setCountBlur(countRefBlur.current);
				} else {
					// vantage is visible and in focus
					countRefFocus.current += 1;
					setCountFocus(countRefFocus.current);
				}
			}, interval);
		},
		[appVisible, appFocus]
	);

	useEffect(() => {
		if (!dep) {
			return;
		}
		startCounter({
			interval: 1000
		});
	}, [dep, startCounter]);

	useEffect(() => {
		return () => {
			setStatus(false);
			countRefFocus.current = 0;
			countRefBlur.current = 0;
			setCountFocus(0);
			setCountBlur(0);
			clearInterval(timerRef.current);
		};
	}, [dep]);

	return { countFocus, countBlur, status };
};

export default useTimer;
