import { View, Text, FlatList, Image } from 'react-native';
import { imageAssets } from '../../constant/Option';
import * as Progress from 'react-native-progress';

const CourseProgress = ({ courseList }) => {
  ///////////////////////////////////////////////////
  return (
    <View className="mt-2 ">
      <Text className="font-oRegular">Progress</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View className="my-5 flex-grow bg-gray-100 mr-4  p-2 rounded-2xl border border-red-200">
              <View className="flex-row mr-2">
                <Image
                  source={imageAssets[item?.banner_image]}
                  className="w-[60px] h-[60px] rounded-md"
                />

                <View className="px-2 w-[200px]">
                  <Text
                    numberOfLines={2}
                    className="font-oRegular text-[13px] "
                  >
                    {item?.courseTitle}
                  </Text>
                  <Text className="font-oRegular text-[13px]">
                    {item?.chapters?.length} Chapters
                  </Text>
                </View>
              </View>
              <View className="mt-2">
                <Progress.Bar progress={0} width={270} />
                <Text className="font-oRegular text-[10px] text-right">
                  3 Out of 5 Chapter
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CourseProgress;
