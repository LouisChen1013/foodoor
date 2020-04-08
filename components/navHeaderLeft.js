import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

const NavHeaderLeft = ({ navigation, toScreen, buttonText }) => {
  return (
    <View style={styles.headerButtonContainer}>
      <Button
        onPress={() => navigation.navigate(toScreen)}
        title={buttonText}
        color="#e19400"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerButtonContainer: {
    marginLeft: 10,
  },
});

export default withNavigation(NavHeaderLeft);
