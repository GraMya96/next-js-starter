import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export const useCustomRouter = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const URLquery: {
		search?: string;
		page?: string;
	} = {};

	let search = searchParams.get('search');
	let page = searchParams.get('page');

	if (search) URLquery.search = search;
	if (page) URLquery.page = page;

	const pushURLQuery = (search: string, page: string) => {
		if (search !== undefined) {
			search === '' ? delete URLquery?.search : (URLquery.search = search);
		}
		if (page !== undefined) {
			page === '' ? delete URLquery?.page : (URLquery.page = page);
		}

		const newQuery = new URLSearchParams(URLquery).toString();
		router.push(`${pathname}?${newQuery}`);
	};

	return { URLquery, pushURLQuery };
};
