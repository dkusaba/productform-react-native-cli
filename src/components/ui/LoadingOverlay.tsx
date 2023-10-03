import React from 'react';
import {Dimensions, View, ActivityIndicator, StyleSheet} from 'react-native';

function LoadingOverlay(): JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: '#999',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingOverlay;
