import { useEffect, useState, RefObject } from 'react';

interface IntersectionObserverEntry {
	isIntersecting: boolean;
}

type RootMargin = string | number;

const useIsOnScreen = <T extends HTMLElement>(
	ref: RefObject<T>,
	rootMargin: RootMargin = 0
) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(
			([entry]: IntersectionObserverEntry[]) =>
				setIsVisible(entry.isIntersecting),
			{
				rootMargin:
					typeof rootMargin === 'number' ? `${rootMargin}px` : rootMargin,
			}
		);

		observer.observe(ref.current);

		return () => {
			if (!ref.current) return;
			observer.unobserve(ref.current);
		};
	}, [ref, rootMargin]);

	return isVisible;
};

export default useIsOnScreen;
