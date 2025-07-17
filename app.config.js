import 'dotenv/config';

export default {
  expo: {
    name: "Newslytic",
    slug: "Newslytic",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/app-launch-icon.png",
    scheme: "newslytic",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.shahzaibawan.newslytic",
      icon: "./assets/images/app-launch-icon.png"
    },
    android: {
      permissions: ["INTERNET"],
      package: "com.shahzaibawan.newslytic",
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-launch-icon.png",
        backgroundColor: "#F8F8FF"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/Newslytic_main_logo_tranparent.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/Newslytic_main_logo_tranparent.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#F8F8FF"
        }
      ],
      "expo-font",
      "expo-sqlite"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "e3d8852c-1711-4071-95fa-6defc565b09b"
      },
      EXPO_PUBLIC_GUARDIAN_NEWS_API_KEY: process.env.EXPO_PUBLIC_GUARDIAN_NEWS_API_KEY
    }
  }
};
