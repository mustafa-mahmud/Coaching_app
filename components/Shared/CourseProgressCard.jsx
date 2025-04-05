import { View, Text, Image } from 'react-native';
import { imageAssets } from '../../constant/Option';
import * as Progress from 'react-native-progress';

const CourseProgressCard = ({ item, width = 280 }) => {
  function getCompletedChapters(course) {
    const completedChapter = course?.completedChapter?.length;
    const perc = completedChapter / course?.chapters?.length;

    return perc;
  }
  ///////////////////////////////////////////////////
  return (
    <View
      style={{ width: width }}
      className="my-5 flex-grow bg-gray-100 mr-4 p-2 rounded-2xl border border-red-200"
    >
      <View className="flex-row mr-2">
        <Image
          source={imageAssets[item?.banner_image]}
          className="w-[60px] h-[60px] rounded-md"
        />

        <View className="px-2 w-[200px]">
          <Text numberOfLines={2} className="font-oRegular text-[13px]">
            {item?.courseTitle}
          </Text>
          <Text className="font-oRegular text-[13px]">
            {item?.chapters?.length} Chapters
          </Text>
        </View>
      </View>
      <View className="mt-2">
        <Progress.Bar
          progress={getCompletedChapters(item)}
          width={width - 30}
        />
        <Text className="font-oRegular text-[10px]">
          {item?.completedChapter?.length ?? 0} Out of
          {item?.chapters?.length} Chapter
        </Text>
      </View>
    </View>
  );
};

export default CourseProgressCard;
