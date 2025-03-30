import { View, Text, Image, Pressable } from 'react-native';
import { imageAssets } from '../../constant/Option';
import { Ionicons } from '@expo/vector-icons';
import Button from '../Shared/Button';
import { useRouter } from 'expo-router';

const Intro = ({ course }) => {
  const router = useRouter();
  ///////////////////////////////////////////////////
  return (
    <View>
      <Image
        source={imageAssets[course?.banner_image]}
        className="w-full h-[250px]"
      />

      <View className="p-2">
        <Text className="font-oBold text-[16px]">{course?.courseTitle}</Text>

        <View>
          <View className="flex-row gap-2 items-center mt-2">
            <Ionicons name="book" size={20} color={'#000'} />
            <Text className="font-oRegular text-[13px] my-3">
              {course?.chapters?.length} Chapters
            </Text>
          </View>
        </View>

        <Text className="font-oBold text-[16px]">Description:</Text>
        <Text className="font-oRegular text-[14px] text-GRAY">
          {course?.description}
        </Text>
        <Button text={'Start Now'} onPress={() => console.log(123)} />
      </View>

      <Pressable className="absolute p-2" onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={23} />
      </Pressable>
    </View>
  );
};

export default Intro;
