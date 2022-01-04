import React, {useState, useEffect, Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Button,
    Alert,
    Touchable,
    TextInput,
    ToastAndroid,
    FlatList,
    RefreshControl,
    ActivityIndicator,
  } from 'react-native';
import DeprecatedViewStylePropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewStylePropTypes';

class QuizTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionIndex: 0,
            testScore: 0,
            test: [],
            isLoaded: false,
            testId: "",
            navigation: 0,
            tags: "",
            nick: "",
        };
        // const { testIdParam } = props.route.params;
        console.log("tagi: "+props.tags+"\n nick: "+props.nick+"propsy: "+JSON.stringify(props))
        this.nick = props.nick
        this.testId =  props.testId;
        this.tags = props.tags
        this.setState({testId: this.testId})
        this.questionIndex = 0;
        this.testScore = 0;
        this.navigation = props.navigation;
        console.log("ide sobie: "+props.testId)
    }

    sendDataToResult = () => {
        console.log("nick: "+this.nick,
        "\n score: "+this.testScore,
        "\n total: "+this.test.length,
        "\n type: "+this.tags,)
        fetch('http://tgryl.pl/quiz/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nick": this.nick,
                "score": this.testScore,
                "total": this.test.length,
                "type": "Matematyka",
            })
        });
    }

    TestQuestion = (props) => {
        return (
          <View>
            <View style={styles.testQuestionBox}>
              <Text style={styles.testQeustionText}>
                {props.questionContent}
              </Text>
            </View>
          </View>
        )
    }

    changeTestQuestion = (isCorrect) => {
        if ( this.test != null && this.test.length > this.questionIndex+1 ){
          this.questionIndex = this.questionIndex + 1
            this.setState({questionIndex: this.questionIndex})
            console.log(this.questionIndex)
            if(isCorrect) testScore = this.testScore+1
        } else if ( this.test.length <= this.questionIndex+1 ){
          Alert.alert(
            'Test skonczony',
            'Twoj wynik to: '+this.testScore+" na: "+this.test.length,
            [        
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )

          this.sendDataToResult();
    
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          let yyyy = today.getFullYear();
    
          today = yyyy + '-' + mm + '-' + dd;

    
          this.resetQuestionIndex()
          this.resetTestScore()

          this.tetdId = '';
          this.setState({testId: this.testId})
    
          this.navigation.navigate("Home")
        } else if ( this.test == null)
          Alert.alert(
            'Alert Title',
            'change question error occured, this.test is null',
            [        
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        else 
          Alert.alert(
            'Alert Title',
            'change question error occured',
            [        
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )  
    }
  
    resetQuestionIndex = () =>{
        this.questionIndex =  0;
        this.setState({questionIndex: this.questionIndex})
    }
    
    resetTestScore= () =>{
        this.testScore =  0;
        this.setState({testScore: this.testScore})
    }

    fetchTest = async () => {
        try {
            await fetch('https://tgryl.pl/quiz/test/'+this.testId)
                .then((response) => response.json())
                .then((json) => {this.test = json.tasks, console.log("this is repsone from first fetch: "+json.tasks)})
                .then(() => {this.setState({isLoaded: true})}
                )
        } catch (error) {
        console.error(error);
        } finally {
            console.log(this.test.tasks)
            this.isLoaded = true;
        }
    }

    componentDidMount(){
        this.setState({testId: this.testId})
        this.setState({tags: this.tags})
        this.setState({nick: this.nick})
        this.fetchTest();
        console.log("Component did mount func")
    }

    changeisLoaded = () => {
        this.setState({isLoaded: true})
        console.log("is Lodded chnage func")
    }

    renderTestAnswers = (func) => {
        let questionObj = this.test[this.questionIndex];
            // console.log("question obj:  "+questionObj)
            console.log("renderTest Answers func")

            const answerLabelTabel = ["A: ","B: ","C: ", "D: "]
            const answersBody = questionObj.answers.map( function(answerObj, index){
            return (
                <TouchableOpacity
                key={index}
                style={styles.testAnswerBox}
                onPress={ () => { func(questionObj.isCorrect) } }>
                    <Text style={styles.testAnswerText}>
                        {answerLabelTabel[index]+answerObj.content}
                    </Text>
                </TouchableOpacity>
            )
        } )
        return (
            <View style={styles.testScreenContainer}>
                <View>
                    <View style={styles.testQuestionBox}>
                    <Text style={styles.testQeustionText}>
                        {questionObj.question}
                    </Text>
                    </View>
                </View>
                {answersBody}
            </View>
        )
    }

    render(){
        if( this.isLoaded ){
            // console.log(this.test)
            // console.log("na hama: "+this.test[0])
            // console.log(this.questionIndex)
            console.log("redner in general")
            
            return this.renderTestAnswers(this.changeTestQuestion); 
        } else {
            return(
            <View>
                <Text>Please Wait...</Text>
                <Button title='Press me!' onPress={() => {this.setState({isLoaded: true}), console.log("klik")}}/>
            </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    testScreenContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-evenly',
        margin: 0,
        padding: 20,
        width: '100%',
        height: '100%',
      },
      testQuestionBox: {
        display: 'flex', 
        flexDirection: 'row',
        flexGrow: 1,
        borderWidth: 2,
        padding: 10,
        margin: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        minWidth: '76%',
      },
      testQeustionText: {
        textAlign: 'center',
        fontSize: 18,
      },
      testTimerRoundBox: {
        alignSelf: 'flex-end',
        height: 60,
        justifyContent: 'center',
        margin: 5,
      },
      testAnswerBox: {
        justifyContent: 'center',
        minWidth: '65%',
        padding: 10,
        flexGrow: 1,
        borderWidth: 1,
        margin: 5,
      },
      testAnswerText: {
        textAlign: 'left',
        fontSize: 13,
      }
});


export default QuizTest;