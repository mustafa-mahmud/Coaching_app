import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { PraticeOption } from '../../constant/Option';
import { useRouter } from 'expo-router';

const PraticeSection = () => {
  const router = useRouter();
  ///////////////////////////////////////////////////
  return (
    <View className="mt-5">
      <Text className="font-oRegular text-[16px]">Pratice Section</Text>

      <View>
        <FlatList
          data={PraticeOption}
          numColumns={3}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => router.push('/practice/' + item.name)}
                key={index}
                className="flex-1 mr-2"
              >
                <Image
                  source={item.image}
                  className="w-[100%] h-[120px]  my-3 rounded-xl max-w-[160px]"
                />

                <Text className="absolute left-2 font-oRegular text-WHITE top-5">
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default PraticeSection;
