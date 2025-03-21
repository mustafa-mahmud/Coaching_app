import { Image, Text, View } from 'react-native';

const Index = () => {
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

        <View className="p-3 bg-WHITE rounded-lg mt-5">
          <Text className="text-[13px] text-center color-PRIMARY font-oBold">
            Get Started
          </Text>
        </View>

        <View className="p-3 rounded-lg mt-5 bg-PRIMARY border">
          <Text className="text-[13px] text-center color-WHITE font-oRegular">
            Alreay have an account?
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Index;
