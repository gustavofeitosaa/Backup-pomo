import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import Timer from './Timer'

class PomodoroTimer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			workTime: 25,
			breakTime: 5,
			intervalType : "Working",
		}
	}

	// trata da conclusão do cronômetro
	handleTimerCompleted = () => {
		//let contador = this.state.points + 1;
		if(this.state.intervalType === "Working")
		{
			this.setState({
				intervalType: "Break"
			})
		}
		else
		{
			this.setState({
				intervalType: "Working",
				//points: contador,
			})
			//console.log(this.state.points);	
		}
	}

	// é acionada quando o usuário muda o texto no TextInput do Foco
	handleWorkTime = (text) =>
	{
		if(text >= 0.1 && text <= 99)
		{
			this.setState({
				workTime: text
			})
		}
		else if(text == 0){
			this.setState({
				workTime: 1
			})
		}else{
			alert("O tempo informado é inválido. Definindo de volta o valor padrão. Por favor insira um tempo válido.")
			this.setState({
				workTime: 25
			})
		}
	}

	// é acionada quando o usuário muda o texto no TextInput do Intervalo
	handleBreakTime = (text) =>{
		if(text >= 0.1 && text <= 99)
		{
			this.setState({
				breakTime:  text
			})
		}
		else if(text == 0){
			this.setState({
				breakTime: 1
			})
		}else{
			alert("O tempo informado é inválido. Definindo de volta o valor padrão. Por favor insira um tempo válido.")
			this.setState({
				breakTime: 5
			})
		}
	}
	
    workArrowLeft = () => {
        let aux = this.state.workTime

        if(aux > 1)
        {    
            this.setState({
                workTime: Math.round((this.state.workTime - 1).toFixed(1))
            })
        }
        else if(aux <= 1 && aux > 0.1){
			this.setState({
                workTime: (this.state.workTime - 0.1).toFixed(1)
            })
		}
		else{
            alert("O tempo informado é inválido. Por favor insira um tempo válido.")
			this.setState({
				workTime: 1
			})
        }
    }
	
	workArrowRight = () => {
		let aux = parseInt(this.state.workTime)  

		if(this.state.workTime >= 99)
		{
			alert("O tempo informado é inválido. Definindo de volta o valor padrão. Por favor insira um tempo válido.")
			this.setState({
				workTime: 25
			})
		}
		else
		{
			this.setState({
				workTime: aux + 1
			})        
		}
	}

	breakArrowLeft = () => {
		let aux = this.state.breakTime

        if(aux > 1)
        {    
            this.setState({
                breakTime: Math.round((this.state.breakTime - 1).toFixed(1))
            })
        }
        else if(aux <= 1 && aux > 0.1){
			this.setState({
                breakTime: (this.state.breakTime - 0.1).toFixed(1)
            })
		}
		else{
            alert("O tempo informado é inválido. Por favor insira um tempo válido.")
			this.setState({
				breakTime: 1
			})
        }
	}


	breakArrowRight = () => {
        let aux = parseInt(this.state.breakTime)  

        if(this.state.breakTime >= 99)
        {
            alert("O tempo informado é inválido. Definindo de volta o valor padrão. Por favor insira um tempo válido.")
			this.setState({
				breakTime: 25
			})
        }
        else
        {
            this.setState({
                breakTime: aux + 1
            })        
        }
    }


	// Chamada para definir o tempo do cronômetro
	handleTime = () => {
		if(this.state.intervalType === "Working")
		{
			return this.state.workTime
		}
		else
		{
			return this.state.breakTime
		}
	}

	render() {
		let time= this.handleTime()
		return (
			<View style={styles.container}>
				<View style={styles.row}>
					<View style={[styles.inputWrap, {borderColor: "#FA5754", borderWidth: 1, backgroundColor: "#fff"}]}>

						<Text style={styles.textStylePomodoro}>Pomodoro</Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "50%", paddingLeft: 10}}>

                            <TouchableOpacity style={{justifyContent: "center"}} onPress={() => {
								this.workArrowLeft()
                            }}>
                                <FontAwesome name='angle-left' size={38} color="#FA5754" style={{paddingHorizontal: 10}}/>   
                            </TouchableOpacity>

							<TextInput  style={{flex: 1, textAlign: 'center',paddingHorizontal: 10 , color: "#FA5754", fontSize: 25, fontWeight: "400", marginHorizontal: 10 }}  keyboardType={Platform.OS == "android" ? "numeric" : "numbers-and-punctuation"} defaultValue={''+this.state.workTime}  maxLength={3} onChangeText={this.handleWorkTime}  selectTextOnFocus />

                            <TouchableOpacity   style={{justifyContent: "center"}} onPress={() => {
                                this.workArrowRight()
                            }}>
                                <FontAwesome name='angle-right' size={38} color="#FA5754" style={{paddingHorizontal: 10}} />
                            </TouchableOpacity>

                        </View>
					</View>
					
					<View style={[styles.inputWrap, {borderColor: "#0D9F6F", borderWidth: 1, backgroundColor: "#fff"}]}>

						<Text style={styles.textStyleBreak}>Intervalo</Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "50%", paddingLeft: 10}}>

                            <TouchableOpacity style={{justifyContent: "center"}} onPress={() => { 
									this.breakArrowLeft()
								}}>
                                    <FontAwesome name='angle-left' size={38} color="#0D9F6F" style={{paddingHorizontal: 10}}/>   
                            </TouchableOpacity>

                            <TextInput  style={{ flex:1,textAlign: 'center', paddingHorizontal: 10, color: "#0D9F6F", fontSize: 25, fontWeight: "400", marginHorizontal: 10}}  keyboardType={Platform.OS == "android" ? "numeric" : "numbers-and-punctuation"} defaultValue={''+this.state.breakTime}  maxLength={3} onChangeText={this.handleBreakTime} selectTextOnFocus />
                            
                            <TouchableOpacity   style={{justifyContent: "center"}} onPress={() => {
								this.breakArrowRight()
							}}>
                                    <FontAwesome name='angle-right' size={38} color="#0D9F6F" style={{paddingHorizontal: 10}} />
                            </TouchableOpacity>
                        </View>

					</View>
				</View>
				
				<Timer
					intervalType={this.state.intervalType}
					Oncomplete={this.handleTimerCompleted}
					period={time}
				/>
			</View>
		)
	}
}
export default PomodoroTimer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
        paddingTop: 20,
	  },
	row: {
		flexDirection: "column",
		marginTop: 10,
        marginHorizontal: "auto",
        marginVertical: "auto",
  	},
  	inputWrap: {
		flexDirection: "row",
		// alignItems: "baseline",
		//padding: 20,
		//backgroundColor: "gray",
		borderRadius: 10,
		justifyContent: "space-between",
		marginVertical: 10,
		marginHorizontal: 20,
        paddingHorizontal: 10,
		//alignContent: "flex-end"
	},
	textStylePomodoro: {
		color: "#FA5754",
		fontSize: 20,
		lineHeight: 28,
		fontWeight: "500",
		letterSpacing: 1.5,
		//fontFamily: Platform.OS == "android" ? "notoserif" : "system",
		//marginTop: 40,
		padding: 10,
	},
    textStyleBreak: {
		color: "#0D9F6F",
		fontSize: 20,
		lineHeight: 28,
		fontWeight: "500",
		letterSpacing: 1.5,
		//fontFamily: Platform.OS == "android" ? "notoserif" : "system",
		//marginTop: 40,
		padding: 10,
	},
	});