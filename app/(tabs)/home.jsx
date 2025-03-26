import { Platform, Text, View } from 'react-native';
import Header from '../../components/Home/Header';
import NoCourse from '../../components/Home/NoCourse';

const Home = () => {
  ///////////////////////////////////////////////////
  return (
    <View
      className="p-5 flex-1 bg-WHITE"
      style={{
        paddingTop: Platform.OS === 'ios' && 45,
      }}
    >
      <Header />
      <NoCourse />
    </View>
  );
};

export default Home;
