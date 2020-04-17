import React from 'react'
import { View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  ScrollView,
  SafeAreaView
} from 'react-native';

import MainButton from '../components/MainButton'
import DefaultStyles from '../constants/default-styles'

const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>The Game is Over!</Text>
        <View style={styles.imageContainer}>
          <Image 
            // fadeDuration={200}
            source={require('../../assets/success.png')} 
            // source={{uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} 
            style={styles.image}
            resizeMode="cover" />
        </View>
        <View style={styles.resultContainer}>
          <Text style={{...DefaultStyles.bodyText, ...styles.resultText}}>
            The game took <Text style={DefaultStyles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={DefaultStyles.highlight}>{props.userNumber}</Text>.
          </Text>
        </View>
        {/* <Text style={DefaultStyles.bodyText}>Number of rounds: {props.roundsNumber}</Text>
        <Text style={DefaultStyles.bodyText}>Number was: {props.userNumber}</Text> */}
        {/* <Button title="New Game" onPress={props.onRestart} /> */}
        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  )
}

const window = Dimensions.get('window')

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 10,
  },
  imageContainer: {
    width: window.width * 0.7,
    height: window.width * 0.7,
    borderRadius: window.width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: window.height / 30,
  },
  resultContainer: {
    width: '90%',
    marginHorizontal: 20,
    marginVertical: window.height / 60,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultText: {
    textAlign: 'center',
    fontSize: window.height < 600 ? 14 : 20
  },
})

export default GameOverScreen