import { useState, RefObject } from 'react';
import useEventListener from './useEventListener';

export const useHover = <T extends HTMLElement>(ref: RefObject<T>) => {
	const [isHovered, setIsHovered] = useState(false);

	useEventListener('mouseover', () => setIsHovered(true), ref.current);
	useEventListener('mouseout', () => setIsHovered(false), ref.current);

	return isHovered;
};
