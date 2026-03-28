// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // Se você usa App Router (padrão)
        "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Se você usa Pages Router
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // Onde estão seus componentes
        "./src/**/*.{js,ts,jsx,tsx,mdx}", // Se você usa a pasta src
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}