import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  VirtualizedList,
  StyleSheet,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import FlipCard from 'react-native-flip-card';
import Colors from '../../constant/Colors';
import * as Progress from 'react-native-progress';

const Flashcards = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const flashcard = course?.flashcards;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  function getProgress(currentPage) {
    const perc = currentPage / flashcard.length;

    return perc;
  }

  function onScroll(event) {
    const index = Math.round(event?.nativeEvent?.contentOffset?.x / width);
    setCurrentPage(index);
  }
  ///////////////////////////////////////////////////
  return (
    <View className="p-2">
      <Image
        source={require('./../../assets/images/wave.png')}
        className="absolute"
      />

      <View className="flex-row justify-between">
        <Pressable
          onPress={() => router.back()}
          className="p-1 bg-WHITE rounded-md"
        >
          <Ionicons name="arrow-back" size={24} />
        </Pressable>
        <Text className="text-WHITE">
          {currentPage + 1} of {flashcard?.length}
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

      <FlatList
        data={flashcard}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({ item, index }) => (
          <View
            className="items-center justify-center"
            style={{
              width: width * 0.96,
              height: height * 0.8,
            }}
          >
            <FlipCard
              style={styles.card}
              friction={6}
              perspective={1000}
              flipHorizontal={true}
              flipVertical={false}
              flip={false}
              clickable={true}
              onFlipEnd={(isFlipEnd) => {
                console.log('isFlipEnd', isFlipEnd);
              }}
            >
              {/* Face Side */}
              <View style={styles.face}>
                <Text className="font-oBold text-[20px] text-center">
                  {item?.front}{' '}
                </Text>
              </View>
              {/* Back Side */}
              <View style={styles.back}>
                <Text className="font-oRegular text-[16px] text-center">
                  {item?.back}
                </Text>
              </View>
            </FlipCard>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('screen').width - 30,
    height: 400,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  face: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 20,
    width: Dimensions.get('screen').width - 30,
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    width: Dimensions.get('screen').width - 30,
  },
});
export default Flashcards;
