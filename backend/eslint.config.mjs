import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: { globals: globals.browser },
		rules: {
			'@typescript-eslint/no-unused-vars': ['warn'],
			'@typescript-eslint/no-explicit-any': "off",
			'semi': ['error', 'always'],
		}
	},

];