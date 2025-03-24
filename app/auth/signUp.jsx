import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { UserDetailsContext } from '../../context/userDetailsContext';

const SignUp = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userDetail, setUserDetail } = UserDetailsContext;

  async function createNewAccount() {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      const user = resp.user;

      //save user to database
      await saveUser(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function saveUser(user) {
    const data = {
      name: fullName,
      email,
      password,
      member: false,
      uid: user?.uid,
    };

    await setDoc(doc(db, 'users', email), data);
    setUserDetail(data);
  }

  ///////////////////////////////////////////////////
  return (
    <View className="items-center bg-WHITE flex-1 px-4">
      <Image
        source={require('../../assets/images/logo.png')}
        className="w-[150px] h-[150px]"
      />

      <Text className="font-oBold text-lg text-GRAY">Create New Account</Text>
      <TextInput
        placeholder="Full Name"
        className="w-full h-[45px] pl-2 border mt-3 rounded-lg text-sm"
        onChangeText={(value) => setFullName(value)}
        value={fullName}
      />
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
        onPress={createNewAccount}
        className="w-full py-3 mt-3 rounded-lg  bg-PRIMARY"
      >
        <Text className="text-center text-WHITE font-[14px] font-oRegular ">
          Create Account
        </Text>
      </TouchableOpacity>

      <View className="w-full flex-row justify-around mt-7">
        <Text className="font-[12px] font-oRegular">
          Already have an account?
        </Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text className="text-PRIMARY font-oBold text-center font-[13px]">
            Sign in here
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
