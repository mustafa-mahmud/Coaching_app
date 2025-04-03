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
import { useEffect, useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig.js';

const Quiz = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  function getProgress(currentPage) {
    const perc = currentPage / course?.quiz?.length;

    return perc;
  }

  function onOptionSelect(selectedChoice) {
    setResult((ps) => ({
      ...ps,
      [currentPage]: {
        userChoice: selectedChoice,
        isCorrect: course?.quiz[currentPage].correctAns === selectedChoice,
        question: course?.quiz[currentPage]?.question,
        correctAns: course?.quiz[currentPage].correctAns,
      },
    }));
  }

  async function onQuizFinish() {
    setLoading(true);
    try {
      //save result in db
      await updateDoc(doc(db, 'Courses', course?.docId), {
        quizResult: result,
      });

      setLoading(false);
      router.replace({
        pathname: '/quiz/summery',
        params: {
          quizResultParam: JSON.stringify(result),
        },
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

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
            {currentPage + 1 > course?.quiz?.length
              ? currentPage + 1 - 1
              : currentPage + 1}{' '}
            of {course?.quiz?.length} Questions
          </Text>
        </View>

        <View className="my-3">
          <Progress.Bar
            progress={getProgress(currentPage)}
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
              onPress={() => {
                setSelectedOptions(index);
                onOptionSelect(ops);
              }}
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

        {currentPage === course?.quiz?.length && (
          <Button
            text={'Finish'}
            loading={loading}
            onPress={() => onQuizFinish()}
          />
        )}

        {selectedOptions?.toString() && (
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
