import React from 'react';
import {
  SafeAreaView, Text, StyleSheet, View, TouchableOpacity,
} from 'react-native';

// import { goToProducts, goToCovers } from 'src/navigation/navigation';

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

function SearchScreen () {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingLeft: 20 }}>
            <Text>Search screen</Text>
          </View>
        </SafeAreaView>
      );
    }

export default SearchScreen;
