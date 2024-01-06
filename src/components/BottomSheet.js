import React, {useRef, useEffect} from 'react';
import {View, Button, Dimensions} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import WrapperContainer from './WrapperContainer';

const BottomSheet = ({toggleSheet, children}) => {
  const refRBSheet = useRef();

  useEffect(() => {
    if (toggleSheet) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [toggleSheet]);

  return (
    <WrapperContainer>
      <RBSheet
        ref={refRBSheet}
        height={Dimensions.get('window').height}
        closeOnDragDown={true}
        closeOnPressMask={false}>
        {children}
      </RBSheet>
    </WrapperContainer>
  );
};

export default React.memo(BottomSheet);
