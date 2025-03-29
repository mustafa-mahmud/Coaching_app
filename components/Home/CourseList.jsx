import { FlatList, Image, Text, View } from 'react-native';
import { imageAssets } from '../../constant/Option';
import { padEnd } from 'lodash';
import { Ionicons } from '@expo/vector-icons';

const CourseList = ({ courseList }) => {
  ///////////////////////////////////////////////////
  return (
    <View className="mt-2">
      <Text className="font-oRegular text-[16px] border-b-[1px]">Courses</Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View key={index} className="p-2 mr-2 bg-gray-100 my-4 rounded-lg">
              <Image
                source={imageAssets[item.banner_image]}
                className="w-[200px] h-[150px] rounded-xl"
              />
              <Text className="font-oRegular text-[12px] my-1">
                {item?.courseTitle.slice(0, 25).padEnd(28, '...')}
              </Text>

              <View className="flex-row gap-2 items-center mt-2">
                <Ionicons name="book" size={24} color={'#000'} />
                <Text className="font-oRegular">
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CourseList;
