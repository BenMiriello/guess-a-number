import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  FlatList, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { ScreenOrientation } from 'expo';
// import { ScreenOrientation } from 'expo-screen-orientation'

import MainButton from '../components/MainButton'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import { render } from 'react-dom';

const generateRandomBetwen = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max-min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetwen(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
      <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
    </View>
  )
}

const GameScreen = props => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  
  const initialGuess = generateRandomBetwen(1, 100, props.userChoice);
  const [currentGuess, setcurrentGuess] = useState(initialGuess);
  const [pastGuesses, setpastGuesses] = useState([initialGuess.toString()]);
  const [availabledeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availabledeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver} = props;
  
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    }

    Dimensions.addEventListener('change', updateLayout);

    return () => Dimensions.removeEventListener('change', updateLayout);
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, onGameOver, userChoice]);
  
  const nextGuessHandler = direction => {
    if (
      (direction === 'LOWER' && currentGuess < props.userChoice) || 
      (direction === 'GREATER' && currentGuess > props.userChoice)
    ) {
      Alert.alert('Hey.', 'That doesn\'t seem right...', [
        {text: 'Sorry!', style: 'cancel'}
      ]);
      return;
    }
    if (direction === 'LOWER') {
      currentHigh.current = currentGuess - 1;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetwen(currentLow.current, currentHigh.current, currentGuess);
    setcurrentGuess(nextNumber);
    setpastGuesses(prevGuesses => [nextNumber.toString(), ...prevGuesses]);
  };

  if (availabledeviceHeight < 500) {
    return(
      <View style={styles.screen}>
        <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'LOWER')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'GREATER')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList 
            keyExtractor={item => item.id} 
            data={pastGuesses} 
            renderItem={renderListItem.bind(this, pastGuesses.length)} 
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
      )
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'LOWER')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'GREATER')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* for scrollview and flatlist use contentcontainerstyle={} instead of style={} */}
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => (renderListItem(guess, pastGuesses.length - index)))}
        </ScrollView> */}
        <FlatList 
          keyExtractor={item => item.id} 
          data={pastGuesses} 
          renderItem={renderListItem.bind(this, pastGuesses.length)} 
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 400,
    maxWidth: '90%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1, // for android to make the scrollview scrollable
    // width: '50%',
    width: Dimensions.get('window').width > 350 ? '60%' : '80%'
  },
  list: {
    flexGrow: 1, // special flexbox property sometimes needed for scrollview, flatlist
    alignItems: 'center',
    // justifyContent: 'flex-end', // starts at bottom
  },
  listItem: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 10,
  },
});

export default GameScreen;