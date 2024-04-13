import { useState, useEffect, useCallback } from 'react';

interface FetchOptions {
	[key: string]: any;
}

interface FetchResponse<T> {
	isLoading: boolean;
	error?: Error;
	value?: T;
}

const DEFAULT_OPTIONS = {
	headers: { 'Content-Type': 'application/json' },
};

export const useFetch = <T>(
	url: string,
	options: FetchOptions = {},
	dependencies: any[] = []
): FetchResponse<T> => {
	return useAsync<T>(() => {
		return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
			if (res.ok) return res.json();
			return res.json().then((json) => Promise.reject(json));
		});
	}, dependencies);
};

const useAsync = <T, E = Error>(
	callback: () => Promise<T>,
	dependencies: unknown[] = []
): FetchResponse<T> => {
	const [isLoading, setisLoading] = useState<boolean>(true);
	const [error, setError] = useState<E>();
	const [value, setValue] = useState<T>();

	const callbackMemoized = useCallback(() => {
		setisLoading(true);
		setError(undefined);
		setValue(undefined);
		callback()
			.then((data) => setValue(data))
			.catch((err) => setError(err))
			.finally(() => setisLoading(false));
	}, [...dependencies, callback]);

	useEffect(() => {
		callbackMemoized();
	}, [callbackMemoized]);

	return { isLoading, error, value };
};
