import { useEffect, useState } from 'react';
import { Platform, Alert } from 'react-native';
import {
  Accuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';
import type { LocationObject } from 'expo-location';

export type Coordinates = LocationObject['coords'];

export type UserCoordinates = Coordinates | null;

export type useUserLocationReturnType = {userCoordinates: UserCoordinates };

export const useUserLocation = () :useUserLocationReturnType => {
  const [data, setData] = useState<UserCoordinates>(null);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestForegroundPermissionsAsync().then(({ granted }) => {
        if (!granted) {
          Alert.alert(
            'No access to user location',
            'Please enable user location for a better experience !',
          );
          return;
        }
        getCurrentPositionAsync({ accuracy: Accuracy.High })
          .then((json) => setData(json?.coords))
          .catch((error) => console.log(error));
      });
    } else {
      getCurrentPositionAsync({ accuracy: Accuracy.High })
        .then((json) => setData(json?.coords))
        .catch((error) => console.log(error));
    }
  }, []);

  return { userCoordinates: data };
};
