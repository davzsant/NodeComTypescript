import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      semi : ["error","always"],
      indent: [
        "error",
        2,
        {
          "SwitchCase": 1
        }
      ],

      
    }
  },
];