import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import { Navigation } from 'react-native-navigation'

import Geolocation from '@react-native-community/geolocation';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { goToSearch } from '../navigation/navigation'

const ScreenHeight = Dimensions.get("window").height;


const mapStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: ScreenHeight,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  const crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

Geolocation.getCurrentPosition(success, error, options);

const HomeScreen = (props) => {

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [city, setCity] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [weatherList, setWeatherList] = useState([])

  async function getWeather (latitude, longitude) {
    const weatherURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&exclude=hourly&appid=13876d4a8127a3023b833ffcb6b369c5';
    const URLToGetCity = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=13876d4a8127a3023b833ffcb6b369c5';

    const fetchedForecast = await fetch(weatherURL)
    const fetchedData = await fetch(URLToGetCity)

    const forecastData = await fetchedForecast.json()
    const dataToGetCity = await fetchedData.json()

    const weatherList = forecastData.daily
    const temperatureToday = Math.ceil(forecastData.current.temp)
    const city = dataToGetCity.city.name
    console.log('weatherList', weatherList)
    setCity(city)
    setTemperature(temperatureToday)
    setWeatherList(weatherList)
  }

  function changeRegion(e, updatedRegion) {
    const { latitude, longitude } = e.nativeEvent.coordinate
    setRegion(prevRegion => ({ ...prevRegion, latitude, longitude }))
    getWeather(latitude, longitude)
  }

  useEffect(() => {
    Navigation.events().registerBottomTabPressedListener((selectedTabIndex, unselectedTabIndex) => {
      if (selectedTabIndex.tabIndex === 0) {
        setCity(null)
      }
    });
  })

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>

        <View style={mapStyles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={mapStyles.map}
            initialRegion={region}
            onPress={changeRegion}
          >
            {city && (<Marker
              coordinate={{ latitude: region.latitude, longitude: region.longitude }}
              title={city}
              description={`${temperature} \u2103`}
              onCalloutPress={() => {
                Navigation.updateProps('Search', {city, weatherList}) 

                Navigation.mergeOptions('MAIN_BOTTOM_TABS', {
                  bottomTabs: {
                    currentTabIndex: 1,
                  }
                });
              }}
            />)}
          </MapView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen