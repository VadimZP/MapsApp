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
  const [similarCities, setSimilarCities] = useState([])

  console.log(weatherList)
  const weekDays = weatherList.length > 0 && weatherList.map(item => {
    console.log(item.dt_txt.split(' ')[0])
  })

  function getCity(foundCity) {

    if (foundCity.length === 0) {
      console.log('KKKKEE')
      setSimilarCities([])
      return
    }
    const url = `https://api.teleport.org/api/cities/?search=${foundCity}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const result1 = data._embedded['city:search-results'][0].matching_full_name
        const result2 = data._embedded['city:search-results'][1].matching_full_name
        console.log(foundCity)
        
        setSimilarCities([result1, result2])
      })

    console.log('similarCities', similarCities.length)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View >
        <TextInput
          onChangeText={(foundCity) => getCity(foundCity)}
          value={city}
        />
        {similarCities.length > 0 && (
          <FlatList
            data={similarCities}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          />
        )}
        {/* <GooglePlacesAutocomplete
          placeholder='Search'
          fetchDetails={true}
          onPress={(data) => {

            console.log('sadfdsaf', data, details);
          }}
          query={{
            key: '******',
            language: 'en',
          }}
        /> */}
        {/* <PlacesInput
        googleApiKey='******'
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
