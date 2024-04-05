import { useEffect, RefObject } from 'react';

export const useOffsetClick = (
	ref: RefObject<HTMLElement>,
	callback: () => void
) => {
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback]);
};
