import { Pressable, Text, TextInput, View, ScrollView } from 'react-native';
import Button from '../../components/Shared/Button';
import { useState, useContext } from 'react';
import {
  GenerateCourseAIModel,
  GenerateTopicsAIModel,
} from '../../constant/AiModel';
import Prompt from '../../constant/Prompt';
import Colors from '../../constant/Colors';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig.js';
import { UserDetailsContext } from '../../context/userDetailsContext.js';
import { useRouter, router } from 'expo-router';

const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopic] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);
  // const router = useRouter();

  async function onGenerateTopic() {
    try {
      setLoading(true);

      const PROMPT = userInput + Prompt.IDEA;

      const aiResp = await GenerateTopicsAIModel(PROMPT);
      const topicIdea = JSON.parse(aiResp.response.text());

      setTopics(topicIdea);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  function onTopicSelect(topic) {
    const isAlreadyExist = selectedTopics.find((item) => item === topic);

    if (!isAlreadyExist) {
      setSelectedTopic((ps) => [...ps, topic]);
    } else {
      const topics = selectedTopics.filter((item) => item !== topic);

      setSelectedTopic(topics);
    }
  }

  const isTopicSelected = (topic) => {
    const selection = selectedTopics.find((item) => item === topic);

    return selection ? true : false;
  };

  async function onGenerateCourse() {
    setLoading(true);
    try {
      const PROMPT = selectedTopics + Prompt.COURSE;
      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
      const courses = JSON.parse(aiResp?.response?.text());

      console.log(courses);

      courses?.forEach(async (course) => {
        await setDoc(doc(db, 'Courses', Date.now().toString()), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email,
        });
      });

      setLoading(false);
      // router.push('/(tabs)/home');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  ///////////////////////////////////////////////////
  return (
    <ScrollView className="p-2 bg-WHITE flex-1">
      <Text className="font-oBold text-[22px]">Create New Course</Text>
      <Text className="font-oRegular text-[20px] my-4 text-GRAY">
        What you learn today?
      </Text>
      <Text className="font-oRegular text-[14px] text-GRAY">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </Text>

      <TextInput
        placeholder="(Ex. Learn Python?)"
        className="p-2 border rounded-[10px] h-[100px] mt-5 items-start align-top text-[13px] font-oRegular"
        numberOfLines={3}
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
      />

      <Button
        text={'Generate Topic'}
        type=""
        onPress={onGenerateTopic}
        loading={loading}
      />

      <View className="mt-4">
        <Text className="font-oRegular text-[14px]">
          Select all topics which you want to add
        </Text>

        <View className="flex flex-row flex-wrap gap-1">
          {topics?.map((item, index) => {
            return (
              <Pressable key={index} onPress={() => onTopicSelect(item)}>
                <Text
                  style={{
                    backgroundColor: isTopicSelected(item)
                      ? Colors.PRIMARY
                      : null,
                    color: isTopicSelected(item)
                      ? Colors.WHITE
                      : Colors.PRIMARY,
                  }}
                  className="p-1 text-[12px] font-oRegular border rounded-lg py-1"
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {selectedTopics?.length > 0 && (
        <View className="mb-5">
          <Button
            text={'Generate Course'}
            onPress={() => onGenerateCourse()}
            loading={loading}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default AddCourse;
