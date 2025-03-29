import { FlatList, Platform, ScrollView, Text, View } from 'react-native';
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

  async function getCourseList() {
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
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    userDetail && getCourseList();
  }, [userDetail]);
  ///////////////////////////////////////////////////
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View
          className="p-5 flex-1 bg-WHITE"
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
      }
    />
  );
};

export default Home;
