import React, { useEffect } from 'react';
import {
  SafeAreaView, Text, StyleSheet, View, TouchableOpacity,
} from 'react-native';

import { Navigation } from 'react-native-navigation'

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

function SearchScreen({ props: { city } }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View >
        <Text>{city}</Text>
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
