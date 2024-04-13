'use client';

import { useState, useRef } from 'react';
import { useCustomRouter } from '@/hooks/navigation/useCustomRouter';
import { cn } from '@/lib/utils/cn';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '@/components/ui/input';

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
	readonly?: boolean;
}

export const Search: React.FC<SearchProps> = ({
	readonly = false,
	className,
	...props
}): React.ReactElement => {
	const { URLquery, pushURLQuery } = useCustomRouter();

	const [searchTimer, setSearchTimer] = useState<null | NodeJS.Timeout>(null);
	const searchQueryRef = useRef<string>(URLquery?.search || '');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		searchQueryRef.current = e.target.value;
		if (searchTimer !== null) {
			clearTimeout(searchTimer);
		}
		const newSearchTimer = setTimeout(() => {
			pushURLQuery(searchQueryRef.current, '1');
		}, 500);

		setSearchTimer(newSearchTimer);
	};

	return (
		<div className={cn('relative w-fit', className)} {...props}>
			<Input
				placeholder="Search everything..."
				value={searchQueryRef.current}
				className="bg-white"
				onChange={(e) => handleSearch(e)}
				disabled={readonly}
				readOnly={readonly}
			/>
			<MagnifyingGlassIcon
				width={15}
				height={15}
				className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
			/>
		</div>
	);
};
