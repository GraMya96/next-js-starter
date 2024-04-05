module.exports = {
	prompt: ({ inquirer }) => {
		const questions = [
			{
				type: 'input',
				name: 'slice_name',
				message:
					'What is the first piece of data you want to include in the store (e.g. User, Cart etc.)?',
			},
		];
		return inquirer.prompt(questions).then((answers) => {
			const absPath = `src/redux-toolkit`;
			return { ...answers, absPath };
		});
	},
};
