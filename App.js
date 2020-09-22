import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

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

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// navigator.geolocation.getCurrentPosition(success, error, options);
Geolocation.getCurrentPosition(success, error, options);



const App = () => {

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [city, setCity] = useState(null)
  const [temperature, setTemperature] = useState(null)

  

  function getWeather (latitude, longitude) {
    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=13876d4a8127a3023b833ffcb6b369c5';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('sadfsdaf', data)
        setCity(data.city.name)
        setTemperature(data.list[0].main.temp)
      })
  }

  function changeRegion (e, updatedRegion) {
    console.log('SADSAD', e.currentTarget)
    const { latitude, longitude } =  e.nativeEvent.coordinate 
    setRegion(prevRegion => ({...prevRegion, latitude, longitude}))
    getWeather(latitude, longitude)
  }

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
                coordinate={{latitude: region.latitude, longitude: region.longitude}}
                title={city}
                description={`${temperature} \u2103`}
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

export default App;
