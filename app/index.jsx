import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig.js';
import { useContext, useEffect } from 'react';
import { UserDetailsContext } from '@/context/userDetailsContext.js';

const Index = () => {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);

  // onAuthStateChanged(auth, async (user) => {
  //   if (user) {
  //     const result = await getDoc(doc(db, 'users', user?.email));
  //     setUserDetail(result.data());
  //     router.replace('/(tabs)/home');
  //   }
  // });

  ///////////////////////////////////////////////////
  return (
    <View className="flex-1 bg-WHITE">
      <Image
        source={require('../assets/images/landing.png')}
        className="w-full h-[250px] mt-3"
      />

      <View className="p-4 bg-PRIMARY h-full rounded-t-[25]">
        <Text className="text-xl color-WHITE text-center mt-2 mb-2 font-oBold">
          Welcome to Coaching App
        </Text>
        <Text className="text-sm/7 text-[14px] text-center font-oRegular">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy
        </Text>

        <TouchableOpacity
          className="p-3 bg-WHITE rounded-lg mt-5"
          onPress={() => router.push('/auth/signUp')}
        >
          <Text className="text-[13px] text-center color-PRIMARY font-oBold">
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/auth/signIn')}
          className="p-3 rounded-lg mt-5 bg-PRIMARY border"
        >
          <Text className="text-[13px] text-center color-WHITE font-oRegular">
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
