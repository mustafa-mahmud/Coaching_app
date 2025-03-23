import { SplashScreen, Stack } from 'expo-router';
import '../global.css';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { UserDetailsContext } from '../context/userDetailsContext.js';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [userDetail, setUserDetail] = useState();
  const [fontsLoaded, error] = useFonts({
    'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  //////////////////////////////////////////
  return (
    <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack screenOptions={{ headerShown: false }} />;
    </UserDetailsContext.Provider>
  );
};

export default RootLayout;
