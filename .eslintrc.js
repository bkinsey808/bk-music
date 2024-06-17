module.exports = {
	extends: [
		"plugin:react-hooks/recommended",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"next/core-web-vitals",
		"plugin:testing-library/react",
		"plugin:jest-dom/recommended",
		"plugin:destructuring/recommended",
		"plugin:prettier/recommended",
	],
	plugins: ["prettier", "destructuring"],
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
		"object-shorthand": "error",
		"destructuring/in-params": "off",
	},
};
