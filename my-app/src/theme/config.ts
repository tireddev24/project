// Example of a custom brand color palette (using brand as the key)
const customBrandTokens = {
	brand: {
		50: {value: "#f2e6ff"},
		100: {value: "#cc99ff"},
		200: {value: "#a34dff"},
		// ... define all shades up to 900 or 950
		500: {value: "#6600ff"}, // The base color
		700: {value: "#4d00b3"},
		900: {value: "#1a0033"},
	},
};

// ... inside your defineConfig call
const config = defineConfig({
	theme: {
		tokens: {
			colors: customBrandTokens,
		},
		// ...
	},
});
