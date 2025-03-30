import { View, Text, Image, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { imageAssets } from '../../constant/Option';
import Intro from '../../components/CourseView/Intro';
import Chapters from '../../components/CourseView/Chapters';

const CourseView = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);

  ///////////////////////////////////////////////////
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View className="bg-WHITE flex-1">
          <Intro course={course} />
          <Chapters course={course} />
        </View>
      }
    />
  );
};

export default CourseView;
