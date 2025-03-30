import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';

const Chapters = ({ course }) => {
  ///////////////////////////////////////////////////
  return (
    <View className="p-2">
      <Text className="font-oBold text-[16px]">Chapters</Text>

      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => {
          return (
            <View className="border-dotted border mb-2 flex-row w-full justify-between items-center p-1">
              <View className="flex-row gap-4">
                <Text className="font-oBold">{index + 1}. </Text>
                <Text className="font-oRegular">{item.chapterName}</Text>
              </View>

              <Ionicons name="play" size={16} color={Colors.PRIMARY} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Chapters;
