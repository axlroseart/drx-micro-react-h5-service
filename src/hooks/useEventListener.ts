import { useEffect, useRef } from 'react';

export default function useEventListener(eventType: string, callback: (e: any) => void, element?: any): void {
	const target = element || window;
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (target === null) {
			return;
		}
		const handler = (event: Event) => callbackRef.current(event);

		target.addEventListener(eventType, handler);

		return () => target.removeEventListener(eventType, handler);
	}, [eventType, target]);
}
