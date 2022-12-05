import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';


class TimerDisplay extends React.Component {

	render() {
		const localImage = require("../../../../assets/background_pomodoro.png");

		return (
			<ImageBackground source={localImage} resizeMode='contain' style={styles.container}>
				<Text style={styles.textStyle}> 
					{Math.floor(this.props.time/60).toString().padStart(2,"0") + ":" + 
					(this.props.time % 60).toString().padStart(2,"0")}
				</Text>
			</ImageBackground>
		)
	}
}

export default TimerDisplay;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		bottom: 5,
		paddingVertical: "25%",
		alignItems: 'center',
	},
	textStyle: {
		color: "white",
	    fontSize: 50,
	    fontWeight: "400",
		letterSpacing: 2,
		width: 180,
		marginLeft: 40,
	}
})