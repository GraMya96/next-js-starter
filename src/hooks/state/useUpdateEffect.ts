import { useRef, useEffect } from 'react';

export const useUpdateEffect = (
	callback: () => void,
	dependencies: unknown[]
) => {
	const isMounted = useRef(false);

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
		} else {
			return callback();
		}
	}, dependencies);
};
