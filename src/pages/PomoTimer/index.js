import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
// import Header from './src/components/Header'
import PomodoroTimer from './components/PomoTimer';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <PomodoroTimer />
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