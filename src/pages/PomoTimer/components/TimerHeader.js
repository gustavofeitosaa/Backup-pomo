import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

class TimerHeader extends React.Component {

	// handles the display of timer header


	timerHeader = () => {
		if(this.props.intervalType === "Working")
		{
			if(this.props.running === true) {
				return "Mantenha-se concentrado!"
			}
			else {
				return "Hora de focar!"
			}	
		}
		else {
			if(this.props.running === true) {
				return "É hora do descanso! Aproveite"
			}
			else {
				return "Relaxe :)"
			}	
		}
	}

	
	render() {
	
		let texttoshow = this.timerHeader()
		return(
			<View style={{height: 80}}>
				<Text style={styles.textStyle}>{texttoshow}</Text>
			</View>
		)				
	}
}

const styles = StyleSheet.create({
  textStyle: {
	position: "absolute",
	textAlign: "center",
	right: 0,
	left: 0,
	color: "#474747",
	//backgroundColor: "blue",
    fontSize: 25,
    fontWeight: "500",
    letterSpacing: 1.5,
    //fontFamily: Platform.OS == "android" ? "notoserif" : "Symbol",
    //marginTop: 10,
    padding: 20,
	//backgroundColor: "black",
	//textAlign: "center",
	marginLeft: "auto",
	marginRight: "auto"

  }
});

export default TimerHeader;