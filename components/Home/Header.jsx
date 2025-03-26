import { Text, TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import { UserDetailsContext } from '../../context/userDetailsContext.js';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);
  console.log(userDetail);

  ///////////////////////////////////////////////////
  return (
    <View className="flex flex-row justify-between items-center">
      <View>
        <Text className="font-oBold text-[18px]">
          Hello, {userDetail?.name || 'John Doe'}
        </Text>
        <Text className="font-oRegular">Let's Get Started!</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={30} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
