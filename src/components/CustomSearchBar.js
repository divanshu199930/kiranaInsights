import React from 'react';
import {View, TextInput, Text, StyleSheet, Platform} from 'react-native';
import {scale, textScale, verticalScale} from '../styles/responsiveSize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../styles/colors';

const CustomSearchBar = ({
  placeholder,
  onFilterPress,
  onChangeText,
  value,
  filterApplied,
  loading
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder || 'Search stores...'}
          onChangeText={onChangeText}
          value={value}
          editable={!loading}
          
        />
        {!loading &&
        <TouchableOpacity
        // disabled={!loading}
        activeOpacity={0.9}
          style={styles.filterButtonContainer}
          onPress={onFilterPress}>
          {filterApplied > 0 && (
            <View
              style={styles.filterApplied}>
{/* <Text>{filterApplied}</Text> */}

              </View>
          )}
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>}
        {/* <View style={styles.micButtonContainer}>
          <View style={styles.micIcon} />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  filterApplied : {
    height: verticalScale(11),
    width: scale(11),
    borderRadius: scale(11),
    // padding: scale(5),
    backgroundColor: colors.cyan,
    position: 'absolute',
    top: verticalScale(0),
    right: scale(0),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonContainer: {
    marginLeft: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  filterText: {
    fontSize: textScale(14),
    fontWeight: 'bold',
    color: '#333',
  },
  searchInput: {
    flex: 1,
    fontSize: textScale(16),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    backgroundColor: '#fff',
    borderColor: '#f2f2f2',
    borderWidth: scale(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  micButtonContainer: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  micIcon: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#333',
  },
});

export default CustomSearchBar;
