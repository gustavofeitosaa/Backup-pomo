import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

class TimerButtons extends React.Component {
	
	render() {
		if(this.props.running === true)
		{
			return (
				<View style={styles.container}>
					<TouchableOpacity style={styles.buttonStyle} onPress={this.props.pause}>
						<FontAwesome name="pause" size={44} color="#6C0E23">
                            </FontAwesome>
					</TouchableOpacity>

					<TouchableOpacity style={styles.buttonStyle} onPress={this.props.reset}>
						<FontAwesome name="repeat" size={44} color="#6C0E23">
                            </FontAwesome>
					</TouchableOpacity>
				</View>
			)
		}
		else
		{
			return(
				<View  style={[styles.container, {marginRight: "auto", marginLeft: "auto"}]}>
					<TouchableOpacity style={styles.buttonStyle} onPress={this.props.play}>
						<Text>  <FontAwesome name="play" size={44} color="#6C0E23"></FontAwesome></Text>
					</TouchableOpacity>
				</View>
			)
		}
	}
}

const styles=StyleSheet.create({
	container:{
		flex: 1,
		width: "75%",
		flexDirection: "row" ,
		marginLeft: "auto",
		marginRight: "auto", 
		justifyContent: 'space-evenly',
		marginBottom: 20,
	},
	buttonStyle:{
		alignItems: "center",
		backgroundColor: "#FA5754", //FCA311
	    padding: 15,
		paddingHorizontal: 25,
	    flexDirection: "row" ,
	    borderRadius: 15,
		textAlign: "center"
		
	}, 
	 buttonText: {
	    color: "white",
	    fontSize: 25,
	    fontWeight: "300",
  	}
})

export default TimerButtons