import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constant/Colors';

const Button = ({ text, type = 'fill', onPress, loading = false }) => {
  ///////////////////////////////////////////////////
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-3 w-full rounded-[7px] mt-5 border"
      style={{
        borderColor: Colors.PRIMARY,
        backgroundColor: type === 'fill' ? Colors.PRIMARY : Colors.WHITE,
      }}
      disabled={loading}
    >
      {!loading ? (
        <Text
          className="text-center text-[14px]"
          style={{ color: type === 'fill' ? Colors.WHITE : Colors.PRIMARY }}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          size={'small'}
          color={type === 'fill' ? Colors.WHITE : Colors.PRIMARY}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
