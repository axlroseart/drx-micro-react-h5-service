import { useCallback, useEffect, useState } from 'react';

import { querySerialization } from '../utils/format-tool';

interface FetchParams {
	url: string;
	queryParams: any;
	options?: {};
}

interface FetchReturns {
	loading: boolean;
	status: string;
	value: any;
	error: any;
}

const DEFAULT_OPTIONS = {
	headers: {}
};

export default function useFetch(params: FetchParams): FetchReturns {
	const [loading, setLoading] = useState<boolean>(false);
	const [status, setStatus] = useState<'none' | 'pending' | 'success' | 'error'>('none');
	const [value, setValue] = useState(undefined);
	const [error, setError] = useState(undefined);
	const { url, queryParams, options } = params;

	const fetchUrl = `${url}${querySerialization(queryParams)}`;

	const fetchMemo = useCallback(async () => {
		setLoading(true);
		setStatus('pending');
		const opts = Object.assign(DEFAULT_OPTIONS, options);

		return fetch(fetchUrl, opts)
			.then((res) => {
				if (!res.ok) {
					return Promise.reject(res);
				}
				return res.json();
			})
			.then((data) => {
				setStatus('success');
				setValue(data);
			})
			.catch((error) => {
				setStatus('error');
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [fetchUrl, options]);

	useEffect(() => {
		fetchMemo();
		return () => {
			setLoading(false);
			setStatus('none');
			setValue(undefined);
			setError(undefined);
		};
	}, [fetchMemo]);

	return {
		loading,
		status,
		value,
		error
	};
}
