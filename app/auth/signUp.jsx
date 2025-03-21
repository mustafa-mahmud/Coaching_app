import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

const SignUp = () => {
  const router = useRouter();
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
      />
      <TextInput
        placeholder="Email"
        className="w-full h-[45px] pl-2 border mt-3 rounded-lg text-sm"
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        className="w-full h-[45px] pl-2 border mt-3 rounded-lg text-sm"
      />

      <TouchableOpacity className="w-full py-3 mt-3 rounded-lg  bg-PRIMARY">
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
