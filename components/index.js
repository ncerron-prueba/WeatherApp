import React from 'react';
import {Text, Box, Image, Row} from 'native-base';

export const Card = data => {
  const dt = data.weatherInfo.dt;
  var day = new Date(dt * 1000);

  return (
    <Box>
      <Row justifyContent={'center'} mb={5}>
        <Text fontSize={'xl'} mr={3}>
          {data.weatherInfo.sys.country},
        </Text>
        <Text fontSize={'xl'}>{data.weatherInfo.name}</Text>
      </Row>

      <Row shadow={2} borderRadius="xs">
        <Box>
          <Image
            alt="weather"
            src={`http://openweathermap.org/img/w/${data.weatherInfo.weather[0].icon}.png`}
            size="xl"
          />
        </Box>
        <Box m={2} alignItems={'center'}>
          <Text fontSize={'xs'}>{day.toDateString()}</Text>
          <Text fontSize={'xl'}>{data.weatherInfo.main.temp}º</Text>

          <Text>{data.weatherInfo.weather[0].description}</Text>
        </Box>
      </Row>
      <Box mt={5} width={'80%'} alignSelf={'center'}>
        <Row justifyContent={'space-between'}>
          <Text>Humedad</Text>
          <Text>{data.weatherInfo.main.humidity}%</Text>
        </Row>
        <Row justifyContent={'space-between'}>
          <Text>Velocidad del viento</Text>
          <Text>{data.weatherInfo.wind.speed}</Text>
        </Row>
        <Row justifyContent={'space-between'}>
          <Text>Visibilidad</Text>
          <Text>{data.weatherInfo.visibility}</Text>
        </Row>
        <Row justifyContent={'space-between'}>
          <Text>Presión</Text>
          <Text>{data.weatherInfo.main.pressure}</Text>
        </Row>
      </Box>

      <Box>
        <Text></Text>
      </Box>
    </Box>
  );
};
