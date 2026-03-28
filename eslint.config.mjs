import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const eslintConfig = defineConfig([
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
    {
        plugins: {
            "react-hooks": reactHooks,
            "@next/next": nextPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            "@typescript-eslint/no-explicit-any": "error", // Proíbe 'any'
            "no-console": ["warn", {allow: ["warn", "error"]}], // Aviso para console.log
            "@next/next/no-img-element": "error", // Força uso do <Image /> do Next
        },
    },
    prettierRecommended
]);

export default eslintConfig;
