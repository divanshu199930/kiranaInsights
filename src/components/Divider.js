import React from 'react';
import { View, StyleSheet } from 'react-native';
import { verticalScale } from '../styles/responsiveSize';

const Divider = ({ color = 'transparent', thickness = 0, style , margin= 8}) => {
  return <View style={ { borderBottomColor: color, borderBottomWidth: thickness , marginVertical: verticalScale(margin)}} />;
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: verticalScale(),
  },
});

export default Divider;
