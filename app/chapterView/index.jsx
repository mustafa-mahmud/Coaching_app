import { View, Text, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Progress from 'react-native-progress';
import { useState } from 'react';
import Button from '../../components/Shared/Button';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig.js';

const ChapterView = () => {
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
  const chapters = JSON.parse(chapterParams);
  const [currentPage, setCurrentPage] = useState(0);
  const [loader, setLoader] = useState(false);

  function getProgress(currentPage) {
    const perc = currentPage / chapters?.content?.length;

    return perc;
  }

  async function onChapterComplete() {
    setLoader(true);

    await updateDoc(doc(db, 'Courses', docId), {
      completedChapter: arrayUnion(chapterIndex),
    });
    setLoader(false);
    router.replace('/courseView/' + docId);
  }

  ///////////////////////////////////////////////////
  return (
    <View className="p-2 bg-WHITE flex-1">
      <Progress.Bar
        progress={getProgress(currentPage)}
        width={Dimensions.get('screen').width * 0.95}
      />

      <View className="mt-2">
        <Text className="font-oRegular text-[16px]">
          {chapters?.content[currentPage]?.topic}
        </Text>
        <Text className="font-oRegular text-[14px] mt-5">
          {chapters?.content[currentPage]?.explain}
        </Text>

        {chapters?.content[currentPage]?.code && (
          <Text
            className="p-5 bg-gray-300 font-oRegular text-[16px] mt-5 color-WHITE"
            style={{ backgroundColor: '#000' }}
          >
            {chapters?.content[currentPage]?.code}
          </Text>
        )}
        {chapters?.content[currentPage]?.example && (
          <Text className="p-5 bg-gray-300 font-oRegular text-[16px] mt-5">
            {chapters?.content[currentPage]?.example}
          </Text>
        )}
      </View>

      <View className="absolute bottom-2 w-full ml-2">
        {chapters?.content?.length !== currentPage ? (
          <Button
            text={'Next'}
            onPress={() => setCurrentPage(currentPage + 1)}
          />
        ) : (
          <>
            <View className="">
              <Text className="text-center">Finish your chapters 😁</Text>
            </View>
            <Button
              text={'Finish'}
              onPress={() => onChapterComplete()}
              loading={loader}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default ChapterView;
