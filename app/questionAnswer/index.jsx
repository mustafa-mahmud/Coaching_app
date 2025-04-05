import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const QuestionAnswer = () => {
  const { courseParams } = useLocalSearchParams();
  const router = useRouter();
  const course = JSON.parse(courseParams);
  const qaList = course?.qa;

  const [selectedQuestion, setSelectedQuestion] = useState();
  ///////////////////////////////////////////////////
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View className="pb-3">
          <Image
            source={require('./../../assets/images/wave.png')}
            className="absolute"
          />

          <View className="p-2 mt-4">
            <Pressable
              onPress={() => router.back()}
              className="flex-row justify-between my-3"
            >
              <Ionicons
                name="arrow-back"
                size={23}
                color={'#000'}
                className="p-1 bg-WHITE"
              />
              <Text className="font-oBold text-[18px] color-WHITE">
                Questions & Answers
              </Text>
            </Pressable>
            <Text className="font-oRegular color-WHITE text-[15px]">
              {course?.courseTitle}
            </Text>

            <FlatList
              data={qaList}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => {
                    if (selectedQuestion === index)
                      setSelectedQuestion(undefined);
                    else setSelectedQuestion(index);
                  }}
                  className="p-2 bg-WHITE mt-2 rounded-md elevation-md"
                >
                  <Text className="font-oBold text-[13px]">
                    {item?.question}
                  </Text>

                  {selectedQuestion === index && (
                    <View>
                      <Text className="font-oRegular text-[13px] mt-2">
                        <Text className="font-oBold color-PRIMARY">Ans: </Text>

                        {item?.answer}
                      </Text>
                    </View>
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      }
    />
  );
};

export default QuestionAnswer;
