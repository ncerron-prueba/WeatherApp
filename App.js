/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {Alert, PermissionsAndroid} from 'react-native';
import {NativeBaseProvider, Box, Button, Input, Text} from 'native-base';

import {fetchData, KEY} from './utils';
import GetLocation from 'react-native-get-location';
import {Card} from './components';

const App = () => {
  const [search, setSearch] = useState('');
  const [weatherInfo, setWeatherInfo] = useState();

  const onSubmit = async () => {
    const rta = await fetchData(search, KEY);
    setWeatherInfo(rta);

    setSearch('');
  };

  useEffect(() => {
    const getLocation = async key => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log(granted);
        if (!granted) {
          return Alert.alert(
            'Permissions needed',
            'This app does not currently have permission to access your location',
            [{text: 'Ok', style: 'cancel'}],
          );
        } else {
          await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          }).then(async location => {
            console.log(location, 'sfsdff');

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${key}&units=metric&lang=sp`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            setWeatherInfo(resultado);
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLocation(KEY);
  }, []);

  return (
    <NativeBaseProvider>
      <Box width={'80%'} alignSelf={'center'}>
        <Box mb={10} mt={5}>
          <Input
            onChangeText={setSearch}
            value={search}
            placeholder="Ingrese una Ciudad"
            InputRightElement={<Button onPress={onSubmit}>Buscar</Button>}
          />
        </Box>
        {weatherInfo?.name ? (
          <Card weatherInfo={weatherInfo} />
        ) : (
          <Text>No se encotro la ciudad</Text>
        )}
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
