import { useState, useEffect } from 'react';
import Geocoder from 'react-native-geocoding';

import type { LibrariesQuery } from 'sources/types';

type Location = Geocoder.LatLng | any;

type Locations = Array<Location>;

type ReturnType = { locations: Locations };

Geocoder.init('AIzaSyDIvKPx4obX2T5GbMAeq_jd-cPi9x_4xgM');

const getGeoLocation = (name: string) => Geocoder.from(name)
  .then((json) => json.results[0].geometry.location)
  .catch((error) => console.warn(error));

const getAllCoordinates = async (locations: Array<{name: string}>): Promise<Locations> => {
  const promises = locations.map(async ({ name }) => getGeoLocation(name));
  return Promise.all(promises);
};

export const useGeocoding = ({ libraries = [] } : LibrariesQuery): ReturnType => {
  const [locations, setLocations] = useState<Locations>([]);

  const allCoordinates = async () => {
    const results = await getAllCoordinates(libraries);
    setLocations(results);
  };

  useEffect(() => {
    allCoordinates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { locations };
};
