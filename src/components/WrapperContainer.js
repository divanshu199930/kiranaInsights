import React from 'react';
import {View, Text, SafeAreaView, StatusBar, ToastAndroid} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const WrapperContainer = ({
  children,
  isLoading,
  statusBarColor = 'transparent',
  bodyColor = 'transparent',
  barStyle = 'dark-content',
  removeTopInset = true,
  removeBottomInset = true,
  translucent= false,

}) => {
  const insets = useSafeAreaInsets();
  return (
   
    <View

      style={{
        flex: 1,
        backgroundColor: statusBarColor,
        paddingTop: removeTopInset ? 0 : insets.top,
        paddingBottom: removeBottomInset ? 0 : insets.bottom,
      }}>
    
      <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} translucent={translucent} />
      <View style={{backgroundColor: bodyColor, flex: 1,}}>{children}</View>
    <Toast/>
    </View>
  );
};

export default WrapperContainer;
