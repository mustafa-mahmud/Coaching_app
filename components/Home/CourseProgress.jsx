import { View, Text, FlatList, Image } from 'react-native';
import CourseProgressCard from '../Shared/CourseProgressCard';

const CourseProgress = ({ courseList }) => {
  ///////////////////////////////////////////////////
  return (
    <View className="mt-2 ">
      <Text className="font-oRegular">Progres</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
              <CourseProgressCard item={item} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default CourseProgress;
