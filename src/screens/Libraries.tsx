import React, { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { Library } from 'components/Library';
import { Loading } from 'components/Loading';
import { useUserLocation } from 'hooks/useUserLocation';
import { useLibrariesQuery } from 'sources/queries';

export const LibrariesScreen:FC = () => {
  const { navigate } = useNavigation();
  const { userCoordinates } = useUserLocation();
  const { data, isLoading } = useLibrariesQuery(userCoordinates);
  const { libraries = [], total } = data || {};

  if (!data && isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Button
        style={styles.button}
        onPress={() => {
          navigate('MapView', { libraries, userCoordinates });
        }}
      >
        Show Locations ({total})
      </Button>
      <ScrollView>
        {libraries.map((library) => (
          <Library
            key={`${library.address1}-${library.name}`}
            address1={library.address1}
            name={library.name}
            city={library.city}
            country={library.country}
            zipCode={library.zipCode}
          />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
});
