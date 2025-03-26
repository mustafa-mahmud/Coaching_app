import { Image, Text, View } from 'react-native';
import Button from '../Shared/Button';
import { useRouter } from 'expo-router';

const NoCourse = () => {
  const router = useRouter();
  ///////////////////////////////////////////////////
  return (
    <View className="mt-4 justify-center items-center">
      <Image
        source={require('./../../assets/images/book.png')}
        className="w-[200px] h-[200px] "
      />
      <Text className="font-oBold text-[18px] text-center">
        You Don't Have Any Course
      </Text>

      <Button
        text={'+Create New Course'}
        onPress={() => router.push('/addCourse')}
      />
      <Button text={'Explore Existing Courses'} type="" />
    </View>
  );
};

export default NoCourse;
