import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return (
    <View style={{...styles.card, ...props.style}}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    // ios shadow
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    // android shadow
    elevation: 4,
  }
})

export default Card;