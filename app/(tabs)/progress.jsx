import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { UserDetailsContext } from '../../context/userDetailsContext';
import CourseProgressCard from '../../components/Shared/CourseProgressCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useRouter } from 'expo-router';

const Progress = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <View className="p-2">
      <Image
        source={require('./../../assets/images/wave.png')}
        className="absolute"
      />

      <View>
        <Text className="font-oBold color-WHITE text-[20px] text-center">
          Course Progress
        </Text>
        <FlatList
          data={courseList}
          onRefresh={() => getCourseList()}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/courseView/' + item?.docId,
                  params: {
                    courseParams: JSON.stringify(item),
                  },
                })
              }
            >
              <CourseProgressCard item={item} width={'100%'} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Progress;
