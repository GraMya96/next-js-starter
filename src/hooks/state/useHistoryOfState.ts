import { useCallback, useRef, useState } from 'react';

interface HistoryOfState<T> {
	value: T;
	history: T[];
	pointer: number;
	back: () => void;
	forward: () => void;
	go: (index: number) => void;
}

type SetValueFunction<T> = (value: T | ((prevValue: T) => T)) => void;

function useHistoryOfState<T>(
	defaultValue: T,
	{ capacity = 10 }: { capacity?: number } = {}
): [T, SetValueFunction<T>, HistoryOfState<T>] {
	const [value, setValue] = useState<T>(defaultValue);
	const historyRef = useRef<T[]>([value]);
	const pointerRef = useRef<number>(0);

	const set = useCallback<SetValueFunction<T>>(
		(v: unknown) => {
			const resolvedValue =
				typeof v === 'function' ? (v as (prevValue: T) => T)(value) : v;
			if (historyRef.current[pointerRef.current] !== resolvedValue) {
				if (pointerRef.current < historyRef.current.length - 1) {
					historyRef.current.splice(pointerRef.current + 1);
				}
				historyRef.current.push(resolvedValue);

				while (historyRef.current.length > capacity) {
					historyRef.current.shift();
				}
				pointerRef.current = historyRef.current.length - 1;
			}
			setValue(resolvedValue);
		},
		[capacity, value]
	);

	const back = useCallback(() => {
		if (pointerRef.current <= 0) return;
		pointerRef.current--;
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	const forward = useCallback(() => {
		if (pointerRef.current >= historyRef.current.length - 1) return;
		pointerRef.current++;
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	const go = useCallback((index: number) => {
		if (index < 0 || index > historyRef.current.length - 1) return;
		pointerRef.current = index;
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	const HistoryOfState: HistoryOfState<T> = {
		value,
		history: historyRef.current,
		pointer: pointerRef.current,
		back,
		forward,
		go,
	};

	return [value, set, HistoryOfState];
}

export default useHistoryOfState;
