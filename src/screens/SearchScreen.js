import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, Text, StyleSheet, View, FlatList, TextInput
} from 'react-native';

import { Navigation } from 'react-native-navigation'

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 5,
  },
  weatherCardHeader: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
  cardHeaderText: {
    fontWeight: '700',
  },
  weatherCard: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'column'
  },
  weatherCardText: {
    marginBottom: 10,
    marginHorizontal: 20,
  }
});

function SearchScreen({ props: { city = '', weatherList = [] } }) {

  const [foundCity, setSearchValue] = useState(city)
  const [similarCities, setSimilarCities] = useState([])
  const [weatherData, setWeatherData] = useState(weatherList)

    useEffect(() => {
      setSearchValue(city);
  }, [city])

  async function getWeather(geoNameID) {
    const urlForCity = `https://api.teleport.org/api/cities/geonameid:${geoNameID}/`
    const fetchedCity = await fetch(urlForCity)

    const fetchedCityData = await fetchedCity.json()
    const { location: { latlon: { latitude, longitude } } } = fetchedCityData
    console.log(fetchedCityData)
    const weatherURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&exclude=hourly&appid=13876d4a8127a3023b833ffcb6b369c5';

    const fetchedForecast = await fetch(weatherURL)

    const forecastData = await fetchedForecast.json()

    const weatherData = forecastData.daily
    setWeatherData(weatherData)
  }

  function getCity(foundCity) {
    console.log('foundcity', foundCity.length)
    if (foundCity.length === 0) {
      setSimilarCities([])
      return
    }
    const url = `https://api.teleport.org/api/cities/?search=${foundCity}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(foundCity)
        const result1 = data._embedded['city:search-results'][0].matching_full_name
        const geoNameID1 = data._embedded['city:search-results'][0]._links['city:item'].href.split(':').slice(-1)[0].slice(0, -1)

        const result2 = data._embedded['city:search-results'][1].matching_full_name
        const geoNameID2 = data._embedded['city:search-results'][1]._links['city:item'].href.split(':').slice(-1)[0].slice(0, -1)

        setSimilarCities([{ cityName: result1, geoNameID: geoNameID1 }, { cityName: result2, geoNameID: geoNameID2 }])
      })
  }

  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  function checkCity() {

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1', paddingBottom: 50 }}>
      <View>
        <TextInput
          style={styles.searchInput}
          onChangeText={(value) => {
            setSearchValue(value)
            getCity(value)
          }}
          value={foundCity}
        />
        {similarCities.length > 0 && (
          <FlatList
            style={{
              backgroundColor: '#fff',
              elevation: 5,
              paddingTop: 10,
              paddingLeft: 10
            }}
            data={similarCities}
            renderItem={({ item }) => <Text style={{ marginBottom: 20 }} onPress={() => {
              getWeather(item.geoNameID)
              setSimilarCities([])
              setSearchValue(item.cityName)
            }}>{item.cityName}</Text>}
          />
        )}
        <FlatList
          style={{ marginTop: 20 }}
          data={weatherData}
          renderItem={({ item }) => {
            return (
              <View style={styles.weatherCard}>
                <View style={styles.weatherCardHeader}>
                  <Text style={styles.cardHeaderText}>{weekDays[new Date(item.dt * 1000).getDay()]}</Text>
                </View>
                <View>
                  <Text style={styles.weatherCardText}>
                    Morning: {Math.ceil(item.temp.morn)} &#8451; Day: {Math.ceil(item.temp.day)} &#8451; Evening: {Math.ceil(item.temp.eve)} &#8451;
              </Text>
                </View>
              </View>
            )
          }
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
