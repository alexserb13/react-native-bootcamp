import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Surface,
  Subheading,
  Headline,
  Card,
  Avatar,
} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { Loading } from 'components/Loading';
import { useMemberInfoQuery } from 'sources/queries';

export const BadgeScreen :FC = () => {
  const { data, isLoading } = useMemberInfoQuery();
  const {
    firstName = '',
    lastName = '',
    dateOfBirth,
    memberId,
  } = data || {};
  const avatarText = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.fullScreen}>
      <Card.Title
        title={`${firstName} ${lastName}`}
        left={() => (
          <Avatar.Text size={36} label={avatarText} />
        )}
      />
      <Surface style={styles.rowInformation}>
        <Subheading>Member ID</Subheading>
        <Subheading>{memberId}</Subheading>
      </Surface>
      <Surface style={styles.rowInformation}>
        <Subheading>Birthday</Subheading>
        <Subheading>{dateOfBirth}</Subheading>
      </Surface>
      <View style={styles.codeContainer}>
        <Headline style={styles.codeText}>
          Scan the QR code
        </Headline>
        <Surface style={styles.codeBackground}>
          <QRCode value="https://globant.com" size={200} />
        </Surface>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  rowInformation: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
  },
  codeText: {
    padding: 16,
    textAlign: 'center',
  },
  codeBackground: {
    padding: 20,
  },
});
