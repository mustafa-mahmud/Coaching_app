import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

const Chapters = ({ course }) => {
  const router = useRouter();
  const isChapterCompleted = (index) => {
    const isCompleted = course?.completedChapter?.find((item) =>
      item.includes(index)
    );

    return isCompleted ? true : false;
  };
  ///////////////////////////////////////////////////
  return (
    <View className="p-2">
      <Text className="font-oBold text-[16px]">Chapters</Text>

      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/chapterView',
                  params: {
                    chapterParams: JSON.stringify(item),
                    docId: course?.docId,
                    chapterIndex: index,
                  },
                })
              }
              className="border-dotted border mb-2 flex-row w-full justify-between items-center p-1"
            >
              <View className="flex-row gap-4">
                <Text className="font-oBold">{index + 1}. </Text>
                <Text className="font-oRegular">{item.chapterName}</Text>
              </View>

              {isChapterCompleted(index) ? (
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={Colors.GREEN}
                />
              ) : (
                <Ionicons name="play" size={16} color={Colors.PRIMARY} />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Chapters;
