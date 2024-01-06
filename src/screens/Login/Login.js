import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePath from '../../constants/ImagePath';
import {TextInput} from 'react-native-gesture-handler';
import {scale, verticalScale} from '../../styles/responsiveSize';
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';
import Divider from '../../components/Divider';
import hindi from '../../lang/hindi';
import en from '../../lang/en';
import NavigationStrings from '../../constants/NavigationStrings';
import {ALLOWED_USERS, FIXED_PASSWORD} from '@env';
import useFirebaseData from './fetchData';
import WrapperContainer from '../../components/WrapperContainer';

const Login = ({navigation}) => {
  const {data, loading, error} = useFirebaseData('users');

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(false);
  const allowedUsers = data?.map(user => user.name);

  const fixedPassword = FIXED_PASSWORD;
  const [errorMessage, setErrorMessage] = useState('');
  const passwordRef = useRef(null);
  const handleLogin = () => {
    if (allowedUsers?.includes(username) && password === fixedPassword) {
      const loggedInUser = data?.filter(user => user.name === username);
      navigation.navigate(NavigationStrings.STORE, {loggedInUser});
    } else {
      !allowedUsers?.includes(username) && password !== fixedPassword
        ? setErrorMessage('Invalid Username and Password')
        : !allowedUsers?.includes(username)
        ? setErrorMessage('Invalid Username')
        : password !== fixedPassword
        ? setErrorMessage('Invalid Password')
        : null;
    }
  };

  const handleKeyPress = ({nativeEvent}) => {
    if (
      nativeEvent.key === 'Backspace' &&
      passwordRef.current &&
      passwordRef.current.value === ''
    ) {
      passwordRef.current.blur(); // Blur the TextInput to hide the keyboard
    }
  };
const handleTextChange = (text, type) => {
    type === 'password' ? setPassword(text) : setUsername(text);
    // Check if the text is empty and dismiss the keyboard
    if (text === '') {
      Keyboard.dismiss();
    }
  };
  return (
    <WrapperContainer statusBarColor= {colors.insightsColor}>
       <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
    <View
      style={styles.container}>
        <Divider />
      <Image
        source={ImagePath.kiranaLogo}
        style={styles.imageStyle}
      />
      <Divider margin={4} />
      <Text
        style={{
          ...commonStyles.fontBold24,
          textAlign: 'center',
        }}>{`${en.Kirana}  ${hindi.Kirana}`}</Text>
         <Text
        style={styles.insightsTxt}>{`${hindi.Insights}  ${en.Insights}`}</Text>
      <Divider margin={18} />
      <Text
        style={styles.loginRequestTxt}>
        {hindi.loginRequest}
      </Text>
      <Divider margin={10} />
      <TextInput
        style={{
          ...styles.txtInput,
          ...((errorMessage === 'Invalid Username' ||
            errorMessage === 'Invalid Username and Password') &&
            styles.errorBoundary),
        }}
        placeholder="Username"
        placeholderTextColor={colors.blackOpacity25}
        value={username}
        onChangeText={text => handleTextChange(text, 'username')}
      />
      <Divider />
      <TextInput
        style={{
          ...styles.txtInput,
          ...((errorMessage === 'Invalid Password' ||
            errorMessage === 'Invalid Username and Password') &&
            styles.errorBoundary),
        }}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => handleTextChange(text, 'password')}
        onKeyPress={handleKeyPress}
        ref={passwordRef}
      />

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleLogin} // Call handleLogin on button press
        disabled={!password || !username}
        style={{
          ...commonStyles.shadowMedium,
          padding: scale(12),
          backgroundColor:
            !!password && !!username
              ? colors.headingColor
              : colors.blackOpacity16,
          borderRadius: scale(17),
          paddingHorizontal: scale(36),
          marginTop: verticalScale(36),
        }}>
        <Text
          style={{
            ...commonStyles.fontBold24,
            color: !!password && !!username ? colors.white : colors.whiteOpacity70,
            fontWeight: 'bold',
          }}>
          Login
        </Text>
      </TouchableOpacity>
      {errorMessage !== '' && (
        <Text
          style={{
            ...commonStyles.fontSemiBold15,
            color: 'red',
            marginTop: verticalScale(12),
          }}>
          {errorMessage}
        </Text>
      )}
    </View>
    </ScrollView>
    </WrapperContainer>
  );
};
const styles = StyleSheet.create({

  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
    padding: scale(24),
  },

  imageStyle : {
    resizeMode: 'cover',
    height: verticalScale(99),
    width: scale(90),
  },
  txtInput: {
    ...commonStyles.fontSize18,
    borderRadius: scale(5),
    width: '100%',
    padding: scale(17),
    backgroundColor: colors.F4F4F4,
    borderWidth: scale(0.7),
    borderColor: colors.blackOpacity12,
  },
   loginRequestTxt : {
    ...commonStyles.fontBold24,
    textAlign: 'center',
    color: colors.headingColor,
    fontWeight: '600',
  },
  insightsTxt : {
    ...commonStyles.fontBold24,
    textAlign: 'center',
    color : colors.insightsColor
  },
  errorBoundary: {
    borderColor: colors.red,
    borderWidth: scale(2),
  },
});
export default Login;


