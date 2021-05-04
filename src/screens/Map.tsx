import React, { useRef, useEffect, FC } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useGeocoding } from 'hooks/useGeocoding';
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
  const { locations } = useGeocoding({ libraries });

  useEffect(() => {
    let fitToTimeout: ReturnType<typeof setTimeout>;
    if (mapRef.current && locations.length) {
      fitToTimeout = setTimeout(() => {
        mapRef.current?.fitToSuppliedMarkers(
          locations.map(({ lat, lng }) => `${lat}-${lng}`),
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
  }, [locations]);

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
        {locations.map(({ lat, lng }) => (
          <Marker
            key={`${lat}-${lng}`}
            identifier={`${lat}-${lng}`}
            coordinate={{ latitude: lat, longitude: lng }}
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
