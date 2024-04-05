export const capitalizeFirstLetter = (input: string): string => {
	// Split the input string into words using space as a delimiter
	const words = input?.split(' ');

	// Capitalize the first letter of each word and join them back together
	const capitalizedWords = words?.map((word) => {
		if (word.length === 0) {
			return ''; // Handle empty words (e.g., multiple spaces)
		}
		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	// Join the capitalized words to form the final string
	return capitalizedWords?.join(' ');
};
