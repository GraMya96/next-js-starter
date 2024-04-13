import { useEffect, useRef } from 'react';

export default function useEventListener<T extends EventTarget>(
	eventType: string,
	callback: (e: Event) => void,
	element: T | null = window as any
) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (!element) return;
		const handler = (e: Event) => callbackRef.current(e);
		element.addEventListener(eventType, handler);

		return () => element.removeEventListener(eventType, handler);
	}, [eventType, element]);
}
