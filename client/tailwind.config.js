/** @type {import('tailwindcss').Config} */
const config = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"ucube-navy": "#000828",
				"ucube-orange": "#fe6900",
			},
		},
	},
	plugins: [],
};

export default config;
