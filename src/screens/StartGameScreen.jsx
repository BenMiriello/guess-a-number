import React, { useState, useEffect } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import Card from '../components/Card'
import Input from "../components/Input";
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton'

import Colors from '../constants/colors'

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue ] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

  // validate for android input which doesn't have a keyboard that limits strictly to 0-9
  const handleInput = number => {
    setEnteredValue(number.replace(/[^0-9]/g), '');
  };

  const handleResetInput = () => {
    setConfirmed(false);
    setEnteredValue('');
  }

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4)
    }
  
    Dimensions.addEventListener('change', updateLayout)
    
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

  const handleConfirmInput = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number',
        'Has to be a number between 1 and 99',
        [{text: 'OK', style: 'destructive', handleResetInput}]
      )
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  }

  let confirmedOutput = <View></View>

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected:</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.startGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>
            <Card style={styles.inputContainer}>
              <Text>Select a Number</Text>
              <Input style={styles.input} 
                blurOnSubmit 
                autoCapitalize='none' 
                autoCorrect={false} 
                keyboardType="number-pad" 
                maxLength={2}
                onChangeText={handleInput}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button title="Reset" 
                    onPress={handleResetInput}  
                    color={Colors.accent}
                  />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button title="Confirm" 
                    onPress={handleConfirmInput} 
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    marginBottom: 20,
    fontFamily: 'open-sans-bold',
  },
  inputContainer: {
    // dimensions optimized for small and large devices
    // set to 80% instead of fixed value for default
    // set minwidth so it doesn't get too tiny
    // set maxwidth in case device is really super tiny
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  // button: {
  //   // width: '40%',
  //   // Dimensions.get('window') returns an object with the device window dimensions
  //   // it's a bit more straightforward than setting something to a %
  //   // because you're getting a fixed dimension of the device and not just the parent component
  //   width: Dimensions.get('window').width / 3.5,
  // },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;