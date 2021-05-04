import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import {
  Title,
  Paragraph,
  Card,
  Caption,
  Chip,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDarkThemeContext } from 'context/DarkThemeContext';

 type BookProps = {
  title : string,
  author: string,
  borrowed: string,
  returnedDate: string,
  returnBefore: string,
};

export const Book: FC<BookProps> = ({
  title,
  author,
  borrowed,
  returnedDate,
  returnBefore,
}) => {
  const { theme: { colors } } = useDarkThemeContext();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{author}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.cardInformation}>
        <Paragraph>
          <Caption>Borrowed {borrowed}</Caption>
        </Paragraph>
        <Paragraph>
          {returnedDate ? (
            <Chip
              icon={({ size }) => <Icon name="check-circle-outline" size={size} color="white" />}
              textStyle={styles.chipText}
              style={{ backgroundColor: colors.primary }}
            >
              Returned on {returnedDate}
            </Chip>
          ) : (
            <Chip
              icon={({ size }) => <Icon name="clock-time-three-outline" size={size} color="white" />}
              textStyle={styles.chipText}
              style={{ backgroundColor: colors.pending }}
            >
              Active until {returnBefore}
            </Chip>
          )}
        </Paragraph>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    marginHorizontal: 4,
  },
  cardInformation: {
    justifyContent: 'space-between',
    padding: 16,
  },
  chipText: {
    color: '#ffffff',
  },
  chipPending: {
    backgroundColor: '#FF6D00',
  },
  chipSuccess: {
    backgroundColor: '#009387',
  },
});
