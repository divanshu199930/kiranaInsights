import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import commonStyles from '../styles/commonStyles';
import colors from '../styles/colors';
import {scale, verticalScale} from '../styles/responsiveSize';
import CheckBox from '@react-native-community/checkbox';
// import CheckBox from 'react-native-check-box';
const FilterApplications = ({
  filters,
  appliedFilters,
  alreadyAppliedFilter,
  stores,
  backPress,
}) => {
  const [expandedFilters, setExpandedFilters] = useState([]);
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedValues, setSelectedValues] = useState(
    alreadyAppliedFilter || [],
  );
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const toggleFilter = key => {
    // setExpandedFilters((prev) => ({
    //   ...prev,
    //   [key]: !prev[key],
    // }));
    setExpandedFilters(filters[key]);
    setSelectedKey(key);
  };
  const toggleItem = item => {
    const index = selectedValues?.indexOf(item);
    if (index !== -1) {
      // Item is already selected, remove it
      setSelectedValues(prev => prev?.filter(value => value !== item));
    } else {
      // Item is not selected, add it
      setSelectedValues(prev => [...prev, item]);
    }
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={backPress}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerLabel}>Filters ({stores} Stores)</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.keysContainer}>
          {Object.keys(filters).map(key => (
            <TouchableOpacity
              key={key}
              onPress={() => toggleFilter(key)}
              style={{
                ...styles.filterKeysButton,
                backgroundColor:
                  selectedKey === key ? colors.white : 'transparent',
              }}>
              <Text
                style={{
                  ...styles.filterKey,
                  fontWeight: selectedKey === key ? '800' : 'normal',
                }}>
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.valuesContainer}>
          {expandedFilters?.map((item, index) => (
            <TouchableOpacity
              style={styles.checkBoxContainer}
              key={index}
              onPress={() => toggleItem(item)}>
              <CheckBox
                disabled={false}
                value={selectedValues?.includes(item) ? true : false}
                //   onValueChange={() => setToggleCheckBox((prev)=>item)}
                onValueChange={() => toggleItem(item)}
              />
              <Text style={{...commonStyles?.fontSize16, margin: scale(6)}}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedValues([]);
              appliedFilters([]);
            }}
            style={{backgroundColor: 'transparent', padding: scale(24)}}>
            <Text style={{...commonStyles.fontBold20, fontWeight: 'bold'}}>
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => appliedFilters(selectedValues)}
            style={styles.applyButton}>
            <Text
              style={styles.applyText}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default React.memo(FilterApplications);

const styles = StyleSheet.create({
  headerContainer: {
    // ...commonStyles.shadowMedium,
    backgroundColor: 'white',
    //   height: '10%',
    width: '100%',
    position: 'absolute',
    top: 0,
    alignContent: 'center',
    alignItems: 'center',
    padding: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {...commonStyles?.fontBold36, fontWeight: 'bold'},
  headerLabel: {
    ...commonStyles.fontSemiBold15,
    textAlign: 'center',
    alignSelf: 'center',
  },
  filterKeysButton: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(12),
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    right: 0,
    left: 0,
    backgroundColor: colors.white,
    padding: scale(12),
    paddingVertical: verticalScale(24),
    justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '12%',
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  keysContainer: {
    width: '30%',
    // padding: 16,
    backgroundColor: '#f2f2f2',
  },
  filterKey: {
    ...commonStyles.fontSemiBold15,
  },
  valuesContainer: {
    // flex: 1,
    padding: scale(16),
    // backgroundColor: 'red',
    width: '70%',
  },
  filterItem: {
    marginBottom: 20,
  },
  filterTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  valuesList: {
    marginLeft: 20,
  },
  filterValue: {
    color: '#333',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  applyButton : {
    
        backgroundColor: colors.blackOpacity60,
        width: '50%',
        borderRadius: scale(24),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      
  },
  applyText : {
    ...commonStyles.fontBold20,
    fontWeight: 'bold',
    color: colors.white,
  }
});
