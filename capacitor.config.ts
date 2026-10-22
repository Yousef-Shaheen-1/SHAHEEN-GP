import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shaheengroup.app',
  appName: 'SHAHEEN GROUP',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: false,
  },
  backgroundColor: '#0c0e12',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500,
      launchAutoHide: true,
      backgroundColor: '#0c0e12',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0c0e12',
    },
  },
};

export default config;
