import { View, FlatList, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Intro from '../../../components/CourseView/Intro';
import Chapters from '../../../components/CourseView/Chapters';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { useEffect, useState } from 'react';

const CourseView = () => {
  const { courseParams, courseId } = useLocalSearchParams();
  const [course, setCourse] = useState([]);

  async function getCourseById() {
    const docRef = await getDoc(doc(db, 'Courses', courseId));
    const courseData = docRef.data();

    setCourse(courseData);
  }

  useEffect(() => {
    if (!courseParams) getCourseById();
    else setCourse(JSON.parse(courseParams));
  }, [courseId]);

  ///////////////////////////////////////////////////
  if (!course) return <Text>There is no data of course</Text>;

  return (
    course && (
      <FlatList
        data={[]}
        ListHeaderComponent={
          <View className="bg-WHITE flex-1">
            <Intro course={course} />
            <Chapters course={course} />
          </View>
        }
      />
    )
  );
};

export default CourseView;
