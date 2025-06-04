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
                beVNThin: ['BeVN-Thin'],
                beVNExtralight: ['BeVN-ExtraLight'],
                beVNLight: ['BeVN-Light'],
                beVN: ['BeVN-Regular'],
                beVNMedium: ['BeVN-Medium'],
                beVNSemibold: ['BeVN-SemiBold'],
                beVNBold: ['BeVN-Bold'],
                beVNExtrabold: ['BeVN-ExtraBold'],
                beVNBlack: ['BeVN-Black'],
            },
            boxShadow: {
                'tab': '0px 8px 20px rgba(0, 0, 0, 0.5)',
            },
            screens: {
                tablet: '768px',
            },
        },
    },
    plugins: [],
}
