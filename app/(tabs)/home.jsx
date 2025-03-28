import { Platform, Text, View } from 'react-native';
import Header from '../../components/Home/Header';
import NoCourse from '../../components/Home/NoCourse';
import { db } from '../../config/firebaseConfig.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { UserDetailsContext } from '../../context/userDetailsContext';
import CourseList from '../../components/Home/CourseList.jsx';

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
        <CourseList courseList={courseList} />
      )}
    </View>
  );
};

export default Home;
