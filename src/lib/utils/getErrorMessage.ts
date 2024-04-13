export const getErrorMessage = (error: unknown): string => {
	let message = '';

	if (error instanceof Error) {
		message = error.message;
	} else if (typeof error === 'string') {
		message = error;
	} else if (error instanceof Object) {
		if ('message' in error) {
			message = String(error.message);
		}
	} else {
		message = 'An unknown error occurred';
	}

	return message;
};
