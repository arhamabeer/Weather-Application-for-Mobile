import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SearchBar from './search';
import {haze, snow, sunny, rainy, cloud} from '../assets';

// import LocationSet from './location';

export default function Weather({weatherData, fetchAPIdata}) {
  const [bgImg, setBgImg] = useState(null);
  const {
    weather,
    main: {temp, feels_like, humidity, temp_min, temp_max, pressure},
    wind: {speed},
    name,
  } = weatherData;

  const [{main}] = weather;

  useEffect(() => {
    // console.log(main);
    setBgImg(getBgImg(main));
  }, [weatherData]);

  const getBgImg = main => {
    if (main === 'Snow') return snow;
    if (main === 'Clear') return sunny;
    if (main === 'Rain') return rainy;
    if (main === 'Haze') return haze;
    if (main === 'Clouds') return cloud;
    return haze;
  };
  let textColor =
    bgImg === sunny
      ? 'black'
      : bgImg === snow
      ? 'black'
      : bgImg === rainy
      ? 'black'
      : bgImg === haze
      ? 'black'
      : 'white';

  let searchColor =
    bgImg === sunny
      ? 'white'
      : bgImg === rainy
      ? '#fff'
      : bgImg === cloud
      ? '#b8a7a7'
      : '#fff';
  let tempC = temp - 273.15;
  let feelC = feels_like - 273.15;
  return (
    <View style={styles.sectionContainer}>
      <ImageBackground source={bgImg} style={styles.bgImg} resizeMode="cover">
        <SearchBar fetchAPIdata={fetchAPIdata} searchColor={searchColor} />
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: 'bold',
              fontSize: 60,
            }}>
            {name}
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: 'bold',
              fontSize: 43,
            }}>
            {tempC.toFixed()}°C
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: 'bold',
              fontSize: 43,
            }}>
            {main}
          </Text>
        </View>
        <View style={styles.extraInfo}>
          <Text style={styles.info}>Feels Like: {feelC.toFixed()}°C</Text>
          <Text style={styles.info}>Humidity: {humidity}%</Text>
          <Text style={styles.info}>Min Temp: {temp_min.toFixed()}°C</Text>
          <Text style={styles.info}>Max Temp: {temp_max.toFixed()}°C</Text>
          <Text style={styles.info}>Air Pressure: {pressure} hPa</Text>
          <Text style={styles.info}>Wind Speed: {speed} m/s</Text>
        </View>
      </ImageBackground>
      {/* <LocationSet /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    width: Dimensions.get('screen').width,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  info: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    width: Dimensions.get('screen').width / 2.2,
    fontSize: 18,
    padding: 15,
    paddingHorizontal: 30,
    marginTop: 25,
    color: 'white',
    borderWidth: 1,
    borderRadius: 15,
    textAlign: 'center',
  },
});
