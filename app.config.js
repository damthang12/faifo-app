export default {
    name: "faifo-app",
    slug: "my-faifo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "faifo",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
        supportsTablet: true
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        edgeToEdgeEnabled: true
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png"
    },
    plugins: [
        "expo-router",
        "expo-font",
        "expo-web-browser",
        [
            "expo-splash-screen",
            {
                image: "./assets/images/splash-icon.png",
                imageWidth: 200,
                resizeMode: "contain",
                backgroundColor: "#ffffff"
            }
        ]
    ],
    experiments: {
        typedRoutes: true
    },
    extra: {
        openrouterKey: process.env.OPENROUTER_API_KEY,
        askgeminiKey: process.env.ASKGEMINI_API_KEY,
    },
};
