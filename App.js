import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, View, ActivityIndicator} from 'react-native';
import Weather from './components/weather';
import SearchBar from './components/search';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  const API_KEY = '073cb8aff92adb4e1a4e03028bdd65f8';

  const fetchAPIdata = async cityname => {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}`;
    try {
      const responce = await fetch(API);
      if (responce.status === 200) {
        const data = await responce.json();
        setWeatherData(data);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPIdata('Karachi');
    // console.log('iam',weatherData)
  }, []);

  if (!loaded) {
    return (
      <View style={styles.sectionContainer}>
        <ActivityIndicator color="blue" size={46} />
      </View>
    );
  } else if (weatherData === null) {
    return (
      <View style={styles.sectionContainer}>
        <SearchBar />
        <TextInput>Invalid City Name! please enter correct city anme</TextInput>
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <Weather weatherData={weatherData} fetchAPIdata={fetchAPIdata}/>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
});
