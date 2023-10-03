/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("daisyui"),
    ],
    daisyui: {
        themes: [
            {
                acid: {
                    ...require("daisyui/src/theming/themes")[
                        "[data-theme=acid]"
                    ],
                    "base-100": "#F9FAFB",
                },
            },
        ],
        darkTheme: "light",
    },
};
