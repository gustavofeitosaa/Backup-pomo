import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import pomoBackground from "../../../../assets/background_pomodoro.png";

class TimerDisplay extends React.Component {

	// display currently running timer
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
		// flex: 1,
		width: "100%",
		bottom: 5,
		// marginTop: "5%",
	    // marginBottom: "1%",
	    // marginLeft: "7%",
	    // marginRight: "7%",
	    // padding: "20%",
		paddingVertical: "25%",
		// paddingTop: "33%",
	    //borderColor: "white",
	    //borderRadius: 80,
	    //borderWidth: 5,
		alignItems: 'center',
		//justifyContent: "center",
		//backgroundColor: "#EBF8B8",
	},
	textStyle: {
		// flex: 1,
		// width: "100%",
		//textAlign: "center",
		color: "white",
	    fontSize: 50,
	    fontWeight: "400",
		letterSpacing: 2,
		//borderWidth: 5,
		//borderRadius: 28,
		//marginBottom: 0,
		//shadowColor: "#00000083"
		//backgroundColor: "black",
		width: 180,
		//paddingHorizontal: 30,
		//justifyContent: "space-around"
		marginLeft: 37,
	}
})