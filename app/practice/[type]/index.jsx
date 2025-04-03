import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { PraticeOption } from '../../../constant/Option';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig.js';
import { useContext, useEffect, useState } from 'react';
import { UserDetailsContext } from '../../../context/userDetailsContext.js';
import Colors from '../../../constant/Colors';
import CourseListGrid from '../../../components/PracticScreen/CourseListGrid.jsx';

const PracticeTypeHome = () => {
  const { type } = useLocalSearchParams();
  const option = PraticeOption.find((item) => item.name === type);

  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);

  async function getCourseList() {
    setLoading(true);
    setCourseList([]);

    try {
      const q = query(
        collection(db, 'Courses'),
        where('createdBy', '==', userDetail.email),
        orderBy('createdOn', 'desc')
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setCourseList((pr) => [...pr, doc.data()]);
      });

      setLoading(false);
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  }

  useEffect(() => {
    userDetail && getCourseList();
  }, [userDetail]);
  ///////////////////////////////////////////////////
  return (
    <View>
      <Image source={option.image} className="w-full h-[200px]" />

      <View className="absolute w-full p-2 flex-row items-center gap-2">
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={22}
            color={'#fff'}
            className="bg-PRIMARY p-1"
          />
        </Pressable>
        <Text className="font-oBold text-[25px] text-WHITE">{type}</Text>
      </View>

      {loading && (
        <ActivityIndicator
          className="mt-5"
          size={'large'}
          color={Colors.PRIMARY}
        />
      )}

      <CourseListGrid courseList={courseList} options={option} />
    </View>
  );
};

export default PracticeTypeHome;
