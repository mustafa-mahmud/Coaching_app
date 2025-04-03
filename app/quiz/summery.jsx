import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Button from './../../components/Shared/Button';
import { useRouter } from 'expo-router';
import Colors from '../../constant/Colors';

const QuizSummery = () => {
  const { quizResultParam } = useLocalSearchParams();
  const quizResult = JSON.parse(quizResultParam);
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQues, settotalQues] = useState();
  const router = useRouter();

  function calculateResult() {
    if (quizResult !== undefined) {
      const correctAns_ = Object.entries(quizResult)?.filter(
        ([key, item]) => item?.isCorrect === true
      );

      const totalQues_ = Object.keys(quizResult).length;
      setCorrectAns(correctAns_.length);
      settotalQues(totalQues_);
    }
  }

  function getPercMark() {
    return ((correctAns / totalQues) * 100).toFixed(2);
  }

  useEffect(() => {
    calculateResult();
  }, []);
  ///////////////////////////////////////////////////

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View>
          <Image
            className="w-full h-[700px]"
            source={require('./../../assets/images/wave.png')}
          />

          <View className="absolute w-full p-3">
            <Text className="text-center font-oBold text-[22px] color-WHITE">
              Quiz Summery
            </Text>
            <View className="bg-WHITE rounded-md mt-14 items-center p-2">
              <Image
                className="w-[100px] h-[100px] -mt-10"
                source={require('./../../assets/images/trophy.png')}
              />
              <Text className="font-oBold text-[16px]">
                {getPercMark() > 60 ? 'Congratulations!' : 'Try Again!'}
              </Text>

              <Text className="font-oRegular color-gray-500 mt-2 mb-2 w-full text-center text-[13px]">
                You have gain {getPercMark()}% Correct Answer!
              </Text>

              <View className="flex-row justify-between w-full mt-3">
                <View className="bg-WHITE elevation-md">
                  <Text className="font-oRegular p-2">⁉️ {totalQues} </Text>
                </View>
                <View className="bg-WHITE elevation-md">
                  <Text className="font-oRegular p-2">👍✅ {correctAns} </Text>
                </View>
                <View className="bg-WHITE elevation-md">
                  <Text className="font-oRegular p-2">
                    👎 ❌ {totalQues - correctAns}{' '}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              text={'Back To Home'}
              onPress={() => router.replace('/(tabs)/home')}
            />

            <View className="mt-5 flex-1 w-full">
              <Text className="font-oBold text-[16px]">Summery:</Text>
              <FlatList
                data={Object.entries(quizResult)}
                renderItem={({ item, index }) => {
                  const quizItem = item[1];
                  return (
                    <View
                      style={{
                        backgroundColor: quizItem?.isCorrect
                          ? Colors.LIGHT_GREEN
                          : Colors.LIGHT_RED,
                      }}
                      className="mt-2 elevation-sm p-1 border"
                    >
                      <Text className="w-full font-oRegular">
                        {' '}
                        {quizItem.question}{' '}
                      </Text>
                      <Text>Ans: {quizItem.correctAns} </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      }
    />
  );
};

export default QuizSummery;
