/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NativeBaseProvider, Text, Box, Button, Input} from 'native-base';
const App = () => {
  const [busqueda, guardarBusqueda] = useState('Buenos Aires');
  const onSubmit = async () => {
    const key = '9bb9ebb7fa795919d30b50db36d46501';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${busqueda}&appid=${key}`;
    console.log(url, 'llllllllllllllll');
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    console.log(resultado, 'ásdf');

    //error
    /* {"cod": "404", "message": "city not found"} ásdf */
  };

  useEffect(() => {
    const key = '9bb9ebb7fa795919d30b50db36d46501';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${busqueda}&appid=${key}`;
    console.log(url, 'llllllllllllllll');

    async function fetchData() {
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      console.log(resultado, 'ásdf');
    }
    fetchData();
  }, []);

  return (
    <NativeBaseProvider>
      <Input onChangeText={guardarBusqueda} />
      <Button onPress={onSubmit}>dale</Button>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
