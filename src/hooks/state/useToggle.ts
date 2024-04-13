import { useState } from 'react';

export const useToggle = <T extends boolean | undefined>(defaultValue: T) => {
	const [value, setValue] = useState(defaultValue);

	function toggleValue(value?: T) {
		setValue((currentValue: T) =>
			typeof value === 'boolean' ? value : !currentValue
		);
	}

	return [value, toggleValue] as const;
};
