import React,{ Component } from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Platform } from 'react-native'
import { connect } from 'react-redux'
import QuizCard from './QuizCard'
import { red,green,white,grey } from '../utils/colors'

class Quiz extends Component {
	static navigationOptions = () => ({	title:'Quiz' })

	state={
		questionNumber:0,
		score:0,
		data:null,
		showScore:false
	}

	componentDidMount(){
		this.setState({data:this.props.questions[0]})
	}

	BtnPressed = (type) => {

		const {questionNumber} = this.state
		const {totalQuestions,questions} = this.props

		if(questionNumber+1 < totalQuestions){

			this.setState(prevState => {
				const qsNo=prevState.questionNumber+1
				const score= (type === 'correct' ? prevState.score+1 : prevState.score)

				return {
					questionNumber:qsNo,
					data:questions[qsNo],
					score
				}
			})
		}
		else
		{
			this.setState(prevState => {

				const qsNo=prevState.questionNumber+1
				const score=(type === 'correct' ? prevState.score+1 : prevState.score)

				return {
					questionNumber:qsNo,
					data:questions[qsNo],
					showScore:true,
					score
				}

			})
		}
	}



	render(){

		const {questionNumber,data,showScore,score} = this.state
		const {totalQuestions} = this.props

		return (
				<View style={styles.container}>
					{showScore===false && <Text style={styles.noOfQsnTexts}>{questionNumber+1}/{totalQuestions}</Text>}
					{data && <QuizCard data={data}/>}
					{showScore && <View style={styles.scoreView}>
										<Text style={styles.scoreTitle}>{Math.round(score/totalQuestions*100)}%</Text>
										<Text style={styles.scoreDetail}>{score} out of {totalQuestions} were correct</Text>
								  </View>}
					{showScore===false && <View style={{marginBottom:50}}>
						<TouchableOpacity
					      style={[styles.Btn,{borderRadius:Platform.OS === 'ios' ? 7 : 2,backgroundColor:green}]}
					      onPress={() => this.BtnPressed('correct')}>
					        <Text style={styles.BtnText}>Correct</Text>
					    </TouchableOpacity>
						<TouchableOpacity
					      style={[styles.Btn,{borderRadius:Platform.OS === 'ios' ? 7 : 2,backgroundColor:red}]}
					      onPress={() => this.BtnPressed('wrong')}>
					        <Text style={styles.BtnText}>Wrong</Text>
					    </TouchableOpacity>
					 </View>}
				</View>
				)
	}
}

const mapState = (state,{navigation}) => {
	const {id} = navigation.state.params
	return {
		questions:state[id].questions,
		totalQuestions:state[id].questions.length
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems:'center',
		justifyContent:'space-between'
	},
	noOfQsnTexts:{
		margin:10,
		alignSelf:'flex-start',
		marginTop:20,
		marginBottom:50,
		fontSize:15
	},
	Btn: {
    padding: 20,
    height: 60,
    width:250,
    marginTop:5,
    marginLeft: 40,
    marginRight: 40,
    marginBottom:5,
    alignItems:'center',
    justifyContent:'center'
  	},
   	BtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
  scoreView:{
  	margin:40,
  	marginTop:200,
  	alignItems:'center',
  	justifyContent:'center'
  },
  scoreTitle:{
  	fontSize:100,
  	textAlign:'center'
  },
  scoreDetail:{
  	fontSize:25,
  	textAlign:'center',
  	color:grey
  }
})

export default connect(mapState)(Quiz)