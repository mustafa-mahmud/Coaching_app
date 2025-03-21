import { Image, Text, View } from 'react-native';

const Index = () => {
  ///////////////////////////////////////////////////
  return (
    <View className="flex-1 bg-WHITE">
      <Image
        source={require('../assets/images/landing.png')}
        className="w-full h-[250]"
      />
    </View>
  );
};

export default Index;
