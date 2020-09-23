import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, Text, StyleSheet, View, FlatList, TextInput
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlacesInput from 'react-native-places-input';

import { Navigation } from 'react-native-navigation'

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

function SearchScreen({ props: { city = '', weatherList = [] } }) {

  const [foundCity, setSearchValue] = useState('')

  console.log(weatherList)
  const weekDays = weatherList.length > 0 && weatherList.map(item => {
    console.log(item.dt_txt.split(' ')[0])
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View >
        {/* <TextInput
          onChangeText={(foundCity) => setSearchValue(foundCity)}
          value={city}
        /> */}
        <GooglePlacesAutocomplete
          placeholder='Search'
          fetchDetails={true}
          onPress={(data) => {
            // 'details' is provided when fetchDetails = true
            console.log('sadfdsaf', data, details);
          }}
          query={{
            key: 'AIzaSyCPvTBqpISJDc5z2NjZ6hn-dJ6OU8EE5tE',
            language: 'en',
          }}
        />
          {/* <PlacesInput
        googleApiKey='AIzaSyCPvTBqpISJDc5z2NjZ6hn-dJ6OU8EE5tE'
        onSelect={place => console.log(place)}
    /> */}
        <FlatList
          data={weatherList}
          renderItem={({ item }) => <Text style={styles.item}>{item.main.temp}</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
