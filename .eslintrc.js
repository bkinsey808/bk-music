module.exports = {
	extends: [
		"plugin:react-hooks/recommended",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"next/core-web-vitals",
		"plugin:testing-library/react",
		"plugin:jest-dom/recommended",
		"plugin:prettier/recommended",
	],
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": "warn",
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
			},
		],
	},
};
