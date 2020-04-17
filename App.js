import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./src/components/Header";
import StartGameScreen from "./src/screens/StartGameScreen";
import GameScreen from "./src/screens/GameScreen";
import GameOverScreen from "./src/screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setuserNumber] = useState(null);
  const [guessRounds, setguessRounds] = useState(0);
  const [dataLoaded, setdataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setdataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setguessRounds(0);
    setuserNumber(null);
  };

  const startGameHandler = (SelectedNumber) => {
    setuserNumber(SelectedNumber);
  };

  const gameOverHandler = (numofRounds) => {
    setguessRounds(numofRounds);
  };

  let content = <StartGameScreen startGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
