import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Home/Header';
import NoCourse from '../../components/Home/NoCourse';
import { db } from '../../config/firebaseConfig.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { UserDetailsContext } from '../../context/userDetailsContext';
import CourseList from '../../components/Home/CourseList.jsx';
import PraticeSection from '../../components/Home/PraticeSection.jsx';
import CourseProgress from '../../components/Home/CourseProgress.jsx';

const Home = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCourseList() {
    setLoading(true);
    try {
      setCourseList([]);
      const q = query(
        collection(db, 'Courses'),
        where('createdBy', '==', userDetail?.email)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setCourseList((ps) => [...ps, doc.data()]);
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
    <FlatList
      data={[]}
      onRefresh={() => getCourseList()}
      refreshing={loading}
      ListHeaderComponent={
        <View className="p-2">
          <Image
            source={require('../../assets/images/wave.png')}
            className="absolute h-[250px]"
          />
          <View
            style={{
              paddingTop: Platform.OS === 'ios' && 45,
            }}
          >
            <Header />
            {courseList?.length === 0 ? (
              <NoCourse />
            ) : (
              <View className="flex-1">
                <CourseProgress courseList={courseList} />
                <PraticeSection />
                <CourseList courseList={courseList} />
              </View>
            )}
          </View>
        </View>
      }
    />
  );
};

export default Home;
