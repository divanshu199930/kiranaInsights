import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import useFirebaseData from '../Login/fetchData';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {scale, textScale} from '../../styles/responsiveSize';
import CustomSearchBar from '../../components/CustomSearchBar';
import colors from '../../styles/colors';
import BottomSheet from '../../components/BottomSheet';
import FilterApplications from '../../components/FilterApplications';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import WrapperContainer from '../../components/WrapperContainer';
import useImagePicker from '../../customHooks/useImagePicker';
import Toast from 'react-native-toast-message';
import Divider from '../../components/Divider';

const Store = ({route}) => {
  const loggedInUser = route.params?.loggedInUser || [];
  const {
    data: data,
    loading: loading,
    error: error,
    objData: objData,
  } = useFirebaseData('stores');
  const {
    data: imageData,
    loading: imgLoading,
    error: imgError,
    objData: imgObjData,
  } = useFirebaseData('store_visits');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [toggleSheet, setToggleSheet] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    const areas = [...new Set(data?.map(store => store.area))];
    const types = [...new Set(data?.map(store => store.type))];
    const routes = [...new Set(data?.map(store => store.route))];

    setSelectedArea(areas || '');
    setSelectedType(types || '');
    setSelectedRoute(routes || '');
  }, [data]);

  const filterData = {
    Areas: selectedArea,
    Types: selectedType,
    Routes: selectedRoute,
  };
  const handleSearchChange = useCallback(text => {
    setSearchQuery(text);
  }, []);
  const renderSkeletonItem = () => (
    <SkeletonPlaceholder>
      <View style={styles.skeletonCard}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonAddress} />
        <View style={styles.skeletonInfoContainer}>
          <View style={styles.skeletonInfoItem} />
          <View style={styles.skeletonInfoItem} />
          <View style={styles.skeletonInfoItem} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );

  if (loading && imgLoading) {
    return (
      <View>
        <CustomSearchBar
          onChangeText={handleSearchChange}
          value={searchQuery}
          onFilterPress={() => setToggleSheet(true)}
          loading={loading}
        />

        <FlatList
          data={[{}, {}, {}]}
          renderItem={() => renderSkeletonItem()}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
        
      </View>
    );
  }

  if (error) {
    return <Text>Error fetching data from Firebase: {error.message}</Text>;
  }

  const particularUsersStores = (loggedInUser[0]?.stores || []).map(storeId => {
    const store = objData && objData[storeId];
    const imageCount =
      imgObjData && imgObjData[storeId]
        ? Object.keys(imgObjData[storeId]).length
        : 0;
    return {storeId, ...store, imageCount};
  });

  const appliedFiltersSet = new Set(appliedFilters);
  const filteredStores = particularUsersStores
    .filter(item => {
      return (
        appliedFiltersSet.size === 0 ||
        appliedFiltersSet.has(item.area) ||
        appliedFiltersSet.has(item.type) ||
        appliedFiltersSet.has(item.route)
      );
    })
    .filter(store =>
      store.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
    );


  const renderStoreItem = ({item}) => <RenderStoreItem item={item} />;
  return (
    <WrapperContainer>
      <View style={{backgroundColor: '#f2f2f2'}}>
        {/* Search bar */}
        <CustomSearchBar
          onChangeText={handleSearchChange}
          value={searchQuery}
          onFilterPress={() => setToggleSheet(true)}
          filterApplied={appliedFilters.length}
          loading={loading}
        />

        {/* FlatList with Skeleton Content */}
        <FlatList
          data={filteredStores}
          renderItem={renderStoreItem}
          keyExtractor={(item, index) => item?.storeId}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          scrollsToTop
        />

        <BottomSheet
          toggleSheet={toggleSheet}
          children={
            <FilterApplications
              filters={filterData}
              appliedFilters={filters => {
                setAppliedFilters(filters);
                setToggleSheet(false);
              }}
              stores={data?.length}
              alreadyAppliedFilter={appliedFilters}
              backPress={() => setToggleSheet(false)}
            />
          }
        />
      </View>
    </WrapperContainer>
  );
};

const RenderStoreItem = React.memo(({item}) => {
  const {selectedImages, openImagePicker, uploading} = useImagePicker();
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Image Uploaded!',
      text1Style: {fontSize: 18},
    });
  };
  uploading && showToast();
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.storesCountContainer}>
          <Text style={styles.storesCountTxt}>
            Store Visits : {item?.imageCount}
          </Text>
        </View>
        <Divider margin={7} />
        <Title style={styles.title}>{item.name}</Title>
        <Paragraph style={styles.address}>{item.address}</Paragraph>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Paragraph style={styles.infoLabel}>Area:</Paragraph>
            <Paragraph style={styles.infoText}>{item.area}</Paragraph>
          </View>
          <View style={styles.infoItem}>
            <Paragraph style={styles.infoLabel}>Route:</Paragraph>
            <Paragraph style={styles.infoText}>{item.route}</Paragraph>
          </View>
          <View style={styles.infoItem}>
            <Paragraph style={styles.infoLabel}>Type:</Paragraph>
            <Paragraph style={styles.infoText}>{item.type}</Paragraph>
          </View>
        </View>
      </Card.Content>
      <Button
        mode="contained"
        onPress={() => openImagePicker(item?.storeId)}
        style={[styles.cameraButton, {backgroundColor: getRandomColor()}]}
        labelStyle={styles.cameraButtonLabel}>
        Add Photo
      </Button>
    </Card>
  );
});

export default Store;

const styles = StyleSheet.create({
  card: {
    // margin: 16,
    borderRadius: scale(10),
    elevation: 3,
    marginHorizontal: scale(24),
  },
  storesCountTxt: {color: colors.headingColor, fontWeight: '600'},
  storesCountContainer: {
    backgroundColor: colors.F1F1F2,
    padding: scale(7),
    borderTopEndRadius: scale(8),
    position: 'absolute',
    right: scale(0),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    marginVertical: 8,
    color: colors.blackOpacity70,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    color: 'gray',
  },
  infoText: {
    fontWeight: 'bold',
  },
  searchInput: {
    // height: 40,
    borderColor: 'gray',
    // borderWidth: 1,
    // margin: 10,
    // padding: scale(),
    // borderRadius: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  cameraButton: {
    marginTop: 10,
    // backgroundColor: '#3498db', // Choose your desired color
    borderRadius: scale(10),
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },

  cameraButtonLabel: {
    // color: 'white',
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: 'lightgray',
    height: 1,
    marginVertical: scale(16), // Adjust spacing as needed
  },
  skeletonCard: {
    borderRadius: 10,
    elevation: 3,
    marginBottom: scale(16),
    backgroundColor: colors.skeletonBackgroundColor,
    padding: scale(16),
  },
  skeletonTitle: {
    width: '80%',
    height: scale(20),
    marginBottom: scale(8),
    backgroundColor: colors.skeletonBackgroundColor,
  },
  skeletonAddress: {
    width: '60%',
    height: scale(16),
    marginBottom: scale(16),
    backgroundColor: colors.skeletonBackgroundColor,
  },
  skeletonInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonInfoItem: {
    width: '20%',
    height: scale(16),
    backgroundColor: colors.skeletonBackgroundColor,
  },
});
