import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import Colors from '../../constant/Colors';
import Button from '../../components/Shared/Button';
import { useState } from 'react';

const Quiz = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState();

  console.log(course);

  ///////////////////////////////////////////////////
  return (
    <View>
      <Image
        source={require('./../../assets/images/wave.png')}
        className="h-full w-full"
      />

      <View className="absolute p-2">
        <View className="flex-row justify-between items-center w-full">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={'#fff'} />
          </Pressable>
          <Text className="font-oBold text-[14px] text-right text-WHITE">
            {currentPage + 1} of 10 Questions
          </Text>
        </View>

        <View className="my-3">
          <Progress.Bar
            progress={0.3}
            height={10}
            width={Dimensions.get('screen').width * 0.95}
            color={Colors.WHITE}
          />
        </View>

        <View
          className="p-3 bg-WHITE mt-3 elevation-md rounded-xl"
          style={{
            height: Dimensions.get('screen').height * 0.7,
          }}
        >
          <Text className="font-oBold text-[15px] mb-3">
            {course?.quiz[currentPage]?.question}
          </Text>

          {course?.quiz[currentPage]?.options.map((ops, index) => (
            <TouchableOpacity
              onPress={() => setSelectedOptions(index)}
              key={index}
              style={{
                backgroundColor:
                  selectedOptions === index ? Colors.LIGHT_GREEN : null,
              }}
              className="flex-row items-center gap-1 mt-1 p-2 px-2 rounded-lg border mb-2"
            >
              <Text>{index + 1} . </Text>
              <Text className="font-oRegular">{ops} </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedOptions && (
          <Button
            text={'Next'}
            onPress={() => {
              setCurrentPage((ps) => ps + 1);
              setSelectedOptions(null);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Quiz;
