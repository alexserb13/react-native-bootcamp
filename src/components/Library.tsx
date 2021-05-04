import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Card, Title, Paragraph, Text,
} from 'react-native-paper';

 type LibraryType = {
    address1: string,
    city: string,
    country: string,
    id?: number,
    name: string,
    zipCode: number,
  };

export const Library :FC<LibraryType> = (props) => {
  const {
    address1, name, city, country, zipCode,
  } = props;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{name}</Title>
        <View style={styles.cardRow}>
          <Paragraph>Address</Paragraph>
          <Text>{address1}</Text>
        </View>
        <View style={styles.cardRow}>
          <Paragraph>City</Paragraph>
          <Text>{city}</Text>
        </View>
        <View style={styles.cardRow}>
          <Paragraph>Country</Paragraph>
          <Text>{country}</Text>
        </View>
        <View style={styles.cardRow}>
          <Paragraph>Zip Code</Paragraph>
          <Text>{zipCode}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    marginHorizontal: 4,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
