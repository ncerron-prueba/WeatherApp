import {PermissionsAndroid, Alert} from 'react-native';
import GetLocation from 'react-native-get-location';

export const fetchData = async (pais, key) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${pais}&appid=${key}&units=metric&lang=sp`;
  let respuesta = await fetch(url);
  let resultado = await respuesta.json();

  return resultado;
};

export const KEY = '9bb9ebb7fa795919d30b50db36d46501';

export const getLocation = async key => {
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

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${key}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        return resultado;
      });
    }
  } catch (error) {
    console.error(error);
  }
};
