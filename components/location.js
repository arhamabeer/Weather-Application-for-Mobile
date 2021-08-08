import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

class LocationSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: '',
      address: '',
      tempAddress: '',
    };
  }
  async componentDidMount() {
    Geolocation.getCurrentPosition(info => {
      // console.log('info=> ,', info);
      this.setState({
        lat: info.coords.latitude,
        lng: info.coords.longitude,
      });
      Geocoder.init('AIzaSyCSgzxqFCqPVp_W6I1BLSAQx6Mzr1rvAt0');
      Geocoder.from(33.8688, 151.2093).then(json => {
        // console.log(json);
        json.results[0].address_components.forEach((v, i) => {
          this.setState({
            address: json.results[0].formatted_address,
            tempAddress: json.results[0].formatted_address,
          });
        });
      });
    });
  }
  render() {
    console.log(this.state);
    return (
      <View>
        <Text>Hala</Text>
      </View>
    );
  }
}

export default LocationSet;
