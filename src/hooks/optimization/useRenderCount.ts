import { useEffect, useRef, RefObject } from 'react';

export const useRenderCount = (): number => {
	const count: RefObject = useRef(1);
	useEffect(() => count.current++);
	return count.current;
};
