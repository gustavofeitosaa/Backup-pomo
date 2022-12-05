import React from 'react';
import { View } from 'react-native';
import TimerHeader from './TimerHeader'
import TimerDisplay from './TimerDisplay'
import TimerButtons from './TimerButtons'
import { Vibration } from 'react-native'

class Timer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			running: false,
			time: this.props.period * 60
		}
	}

	// é chamado quando um fluxo de novos adereços chega do componente parental
	UNSAFE_componentWillReceiveProps(nextProps) {
    	this.setState({ running: false, time: nextProps.period * 60 });
		if(this.state.running === true && this.state.time == 0)
		{
			this.handlePlay()
		}
	  }

	render() {
		return (
			<View>
				<TimerHeader
					running={this.state.running}
					intervalType={this.props.intervalType}
				/>
				<TimerDisplay
					time={this.state.time}
				/>
				<TimerButtons
					play={this.handlePlay}
					pause={this.handlePause}
					reset={this.handleReset}
					running={this.state.running}
				/>
			</View>
		)
	}

	// Invocada imediatamente após a atualização
	componentDidUpdate() {
		if(this.state.running === true && this.state.time == 0)
		{
			clearInterval(this.timerId)
			Vibration.vibrate([800, 800, 800])
			this.props.Oncomplete()

		}
		else if(this.state.running === false)
		{
			clearInterval(this.timerId)
		}
	}

	// é acionada quando o botão Play é pressionado
	handlePlay = () => {
		this.setState({
			running: true
		})
		this.timerId = setInterval(() =>{
			this.setState({
				time: this.state.time - 1
			})
		}, 1000)
	}

	// é acionada quando o botão Pause é pressionado
	handlePause = () => {
		clearInterval(this.timerId)
		this.setState({
			running: false
		})
	}

	// é acionada quando o botão Reset é pressionado
	handleReset = () => {	
		clearInterval(this.timerId)
		this.setState({
			running: false,
			time: this.props.period * 60
		})
	}
}

export default Timer;