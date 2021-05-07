import React, { useRef, useEffect, FC } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import type { Libraries } from 'sources/types';
import type { Coordinates } from 'hooks/useUserLocation';

type Props = {
  route: {
    params: {
      libraries: Libraries,
      userCoordinates: Coordinates,
    }
  }
}

export const MapScreen : FC<Props> = (props) => {
  const { libraries } = props.route.params;
  const { latitude = 0, longitude = 0 } = props.route.params.userCoordinates || {};
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    let fitToTimeout: ReturnType<typeof setTimeout>;
    if (mapRef.current && libraries.length) {
      fitToTimeout = setTimeout(() => {
        mapRef.current?.fitToSuppliedMarkers(
          libraries.map((library) => `${library.latitude}-${library.longitude}`),
          {
            animated: false,
            edgePadding: {
              top: 100, right: 100, bottom: 100, left: 100,
            },
          },
        );
      }, 1000);
    }
    return () => clearTimeout(fitToTimeout);
  }, [libraries]);

  return (
    <View style={styles.fullScreen}>
      <MapView
        style={styles.fullScreen}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        ref={(ref) => {
          mapRef.current = ref;
        }}
        provider={PROVIDER_GOOGLE}
        loadingEnabled
        showsUserLocation
      >
        {libraries.map((library) => (
          <Marker
            key={`${library.latitude}-${library.longitude}`}
            identifier={`${library.latitude}-${library.longitude}`}
            coordinate={{
              latitude: parseInt(library.latitude, 10),
              longitude: parseInt(library.longitude, 10),
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});
