import { Text, TextInput, View } from 'react-native';
import Button from '../../components/Shared/Button';
import { useState } from 'react';

const AddCourse = () => {
  const [loading, setLoading] = useState(false);

  function onGenerateTopic() {
    console.log(456);
  }
  ///////////////////////////////////////////////////
  return (
    <View className="p-2 bg-WHITE flex-1">
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
      />

      <Button
        text={'Generate Topic'}
        type=""
        onPress={onGenerateTopic}
        loading={loading}
      />
    </View>
  );
};

export default AddCourse;
