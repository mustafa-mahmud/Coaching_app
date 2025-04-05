import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

const CourseListGrid = ({ courseList, options }) => {
  const router = useRouter();

  function onPress(course) {
    router.push({
      pathname: options.path,
      params: {
        courseParams: JSON.stringify(course),
      },
    });
  }

  ///////////////////////////////////////////////////
  return (
    <View>
      <FlatList
        data={courseList}
        numColumns={2}
        className="p-2"
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(item)}
              key={index}
              className="flex-1 justify-center items-center bg-WHITE m-2 p-2 rounded-lg elevation-sm"
            >
              <Ionicons
                className="absolute top-[10px] left-[5px]"
                name="checkmark-circle"
                size={20}
                color={Colors.GRAY}
              />
              <Image source={options?.icon} className="w-[100px]  h-[100px]" />

              <Text className="font-oRegular text-[13px] text-center mt-2">
                {item?.courseTitle}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CourseListGrid;
