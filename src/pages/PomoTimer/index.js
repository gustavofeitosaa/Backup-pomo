import React from 'react';
import { ImageBackground, ScrollView, StyleSheet} from 'react-native';
// import Header from './src/components/Header'
import PomodoroTimer from './components/PomoTimer';
//import backgroundTelaPomodoro from "../../../assets/background_2.png"

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <ImageBackground source={backgroundTelaPomodoro} resizeMode="stretch="> */}
          <PomodoroTimer />
        {/* </ImageBackground> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
});