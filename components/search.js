import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default function SearchBar({fetchAPIdata}) {
  const [cityname, SetCityname] = useState(null);

  return (
    <View style={styles.sectionContainer}>
      <TextInput
        placeholder="Enter City Name"
        style={{fontSize: 19}}
        value={cityname}
        onChangeText={text => {
          SetCityname(text);
        }}
      />
      <TouchableOpacity onPress={() => fetchAPIdata(cityname)}>
        <Image
          source={require('../assets/icons/search.png')}
          style={{width: 40, height: 40}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 20,
    marginHorizontal: 22,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 30,
  },
});
