import { globalIgnores } from "eslint/config";

const eslintConfig = [
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "server/**", "node_modules/**"]),
  {
    rules: {
      "no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
