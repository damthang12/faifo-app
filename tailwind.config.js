/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                'brand-yellow': '#F99F04',
            },
            fontFamily: {
                phudu: ['Phudu'],
                beVN: ['BeVN'],
            },

        },
    },
    plugins: [],
}
