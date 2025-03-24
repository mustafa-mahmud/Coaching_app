import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from './../../config/firebaseConfig.js';
import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { UserDetailsContext } from '../../context/userDetailsContext.js';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(false);

  async function onSignInClick() {
    setLoading(true);
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      const user = resp.user;

      await getUserDetail();
      setLoading(false);

      router.replace('/(tabs)/home');
    } catch (error) {
      setLoading(false);

      ToastAndroid.show('Incorrect Email & Password', ToastAndroid.BOTTOM);
    }
  }

  async function getUserDetail() {
    const resutl = await getDoc(doc(db, 'users', email));
    setUserDetail(resutl.data());
  }

  ///////////////////////////////////////////////////
  return (
    <View className="items-center bg-WHITE flex-1 px-4">
      <Image
        source={require('../../assets/images/logo.png')}
        className="w-[150px] h-[150px]"
      />

      <Text className="font-oBold text-lg text-GRAY">Welcome Back</Text>
      <TextInput
        placeholder="Email"
        className="w-full h-[45px] pl-2 border mt-3 rounded-lg text-sm"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        className="w-full h-[45px] pl-2 border mt-3 rounded-lg text-sm"
        onChangeText={(value) => setPassword(value)}
        value={password}
      />

      <TouchableOpacity
        onPress={onSignInClick}
        disabled={loading}
        className="w-full py-3 mt-3 rounded-lg  bg-PRIMARY"
      >
        {!loading ? (
          <Text className="text-center text-WHITE font-[14px] font-oRegular">
            Sign In
          </Text>
        ) : (
          <ActivityIndicator size={24} color={'#ffffff'} />
        )}
      </TouchableOpacity>

      <View className="w-full flex-row justify-around mt-7">
        <Text className="font-[10px] font-oRegular">
          Have not any account yet?
        </Text>
        <Pressable onPress={() => router.push('/auth/signUp')}>
          <Text className="text-PRIMARY font-oBold text-center font-[13px]">
            Create here
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
