/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Link, NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cloneNode, isTSEntityName, whileStatement } from '@babel/types';
import { withDecay } from 'react-native-reanimated';
import RNBootSplash from "react-native-bootsplash";
import CountDown from 'react-native-countdown-component';
// import { results, pushToResults} from 'global';

const App = () => {

  type hide = (config?: { fade?: boolean }) => Promise<void>;

  const [nick, onChangeNick] = React.useState('');

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const checkTermsScreen = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if ( value == null )
        return false
      else if ( value == 'terms_accepted' )
        return true
    } catch (e) {
      Alert.alert('Error occured, '+e)
    }
  }

  const [canIskipTermsOfUsage, onChangeTerms] = React.useState(checkTermsScreen());

  const storeData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if ( value == null && nick != '' ){
        await AsyncStorage.setItem('@first_start_key', 'terms_accepted')
        await AsyncStorage.setItem('@nick_key', nick)
      } else if (nick == ''){
        showToast("You must enter your nick in order to continue!")
        return
      } else {
        Alert.alert('unexpected value, '+value)
        return
      }
      onChangeTerms(true);
    } catch (e) {
      Alert.alert('Error occured, '+e)
    }
  }

  const testOneTab = {
    tags : [
      "kot",
      "pies",
      "filozofia"
    ],
    tasks :
      [{
        question: "Czy kot to kot: ",
        answers: [
          {
            content: "tak",
            isCorrect: true,
          },
          {
            content: "nie",
            isCorrect: false,
          },
          {
            content: "byc moze",
            isCorrect: false,
          },
          {
            content: "pewnie nie",
            isCorrect: false,
          },
        ],
        duration: 30},
      {
        question: "Czy pies to kot: ",
        answers: [
          {
            content: "tak",
            isCorrect: true,
          },
          {
            content: "nie",
            isCorrect: false,
          },
          {
            content: "byc moze",
            isCorrect: false,
          },
          {
            content: "pewnie nie",
            isCorrect: false,
          },
        ],
        duration: 30},
    ]
  }

  const testList = [
    {testKey: "test1", label: "Test label 1", tagList: ["tag1", "tag2"], desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"+
    "Etiam sodales convallis fringilla. Suspendisse porttitor dolor ante, "+
    "id faucibus tortor viverra vel. Vestibulum tempus sed quam a porta."+
    "Suspendisse vel risus nibh. Nullam venenatis feugiat lacus, et tempus enim. Cras eget"},
    {testKey: "test2", label: "Test label 2", tagList: ["tag1", "tag2"], desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"+
    "Etiam sodales convallis fringilla. Suspendisse porttitor dolor ante, "+
    "id faucibus tortor viverra vel. Vestibulum tempus sed quam a porta."+
    "Suspendisse vel risus nibh. Nullam venenatis feugiat lacus, et tempus enim. Cras eget"},
    {testKey: "test3", label: "Test label 3", tagList: ["tag1", "tag2"], desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"+
    "Etiam sodales convallisś fringilla. Suspendisse porttitor dolor ante, "+
    "id faucibus tortor viverra vel. Vestibulum tempus sed quam a porta."+
    "Suspendisse vel risus nibh. Nullam venenatis feugiat lacus, et tempus enim. Cras eget"},
  ]

  const [results, onChangeResults] = React.useState([{
    "nick": "Nick",
    "score": "Score",
    "total": "Total",
    "type": "Type",
    "date": "Date" }, 
    {
    "nick": "Marek",
    "score": 18,
    "total": 20,
    "type": "history",
    "date": "2018-11-12"}, 
    {
    "nick": "Robert",
    "score": 12,
    "total": 20,
    "type": "Math",
    "date": "2018-10-11"
    }]);

  // let results = [{
  //   "nick": "Nick",
  //   "score": "Score",
  //   "total": "Total",
  //   "type": "Type",
  //   "date": "Date" }, 
  //   {
  //   "nick": "Marek",
  //   "score": 18,
  //   "total": 20,
  //   "type": "history",
  //   "date": "2018-11-12"}, 
  //   {
  //   "nick": "Robert",
  //   "score": 12,
  //   "total": 20,
  //   "type": "Math",
  //   "date": "2018-10-11"
  //   }]

  const generateTags = ( tagsArray ) => {
    const tagsLayout = tagsArray.map( function(tagElement) {
      return (
        <Text key={tagElement}>#{tagElement} </Text>
      );
    } )
    return tagsLayout
  }

  // ------------------------------------- Test Screen --------------------------------

  const TestQuestion = (props) => {
    return (
      <View>
        <View style={styles.testQuestionBox}>
          <Text style={styles.testQeustionText}>
            {props.questionContent}
          </Text>
        
        {/* <View style={styles.testTimerRoundBox}> */}
          {/* <Text style={styles.testTimertext}>
            {timer}
          </Text> */}
          {/* <View style={styles.testTimerRoundBox}>
            <CountDown
              until={5}
              onFinish={() => changeTestQuestion()}
              onPress={() => alert('hello')}
              size={20}
              timeToShow={['S']}
              timeLabels={{s: ''}}
            />
          </View> */}
        {/* </View> */}
        </View>
      </View>
    )
  }
  const [questionIndex, onChangeQuestionIndex] = React.useState(0);
  const [testScore, onChangeTestScore] = React.useState(0);

  const resetQuestionIndex = () =>{
    onChangeQuestionIndex(0);
  }

  const resetTestScore= () =>{
    onChangeTestScore(0);
  }

  const changeTestQuestion = (testObj, isCorrect, navigation) => {
    if ( testObj != null && testObj.tasks.length > questionIndex+1 ){
      onChangeQuestionIndex(questionIndex+1)
      if(isCorrect) onChangeTestScore(testScore+1)
    } else if ( testObj.tasks.length <= questionIndex+1 ){
      Alert.alert(
        'Test skonczony',
        'Twoj wynik to: '+testScore+" na: "+testObj.tasks.length,
        [        
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;

      results.push({
        "nick": nick,
        "score": testScore,
        "total": testObj.tasks.length,
        "type": "Math",
        "date": today,
        })
      onChangeResults(results)

      resetQuestionIndex()
      resetTestScore()

      navigation.navigate("Home")
    } else if ( testObj == null)
      Alert.alert(
        'Alert Title',
        'change question error occured, testObj is null',
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

  const TestScreen = ({route, navigation}) => {
    
    const { testId } = route.params;
    let testObj
    if( JSON.stringify(testId) == "21" )
      testObj = testOneTab

    questionObj = testObj.tasks[questionIndex]

    const answerLabelTabel = ["A: ","B: ","C: ", "D: "]
    const answersBody = questionObj.answers.map( function(answerObj, index){
      return (
        <TouchableOpacity
          key={index}
          style={styles.testAnswerBox}
          onPress={() => changeTestQuestion(testObj, answerObj.isCorrect, navigation)}>
          <Text style={styles.testAnswerText}>
            {answerLabelTabel[index]+answerObj.content}
          </Text>
        </TouchableOpacity>
      )
    } )

    return (
      <View style={styles.testScreenContainer}>
        <TestQuestion 
          questionContent={questionObj.question}
          timerVariable={questionObj.duration}
        />
        {answersBody}
      </View>
    )
  }

  const testHandler = ({route}) => {
    const { testId } = route.params;
    let testObj
    if( JSON.stringify(testId) == "21" )
      testObj = testOneTab
    resetQuestionIndex()
    return TestScreen(testObj.tasks[questionIndex])
  }

  // ------------------------------------- HOME Screen --------------------------------

  const HomeScreen = ({ navigation: { navigate }, route: {route} }) => {

    const layout = testList.map( function(testElment) {
      return (
        <TouchableOpacity
          key={testElment.testKey}
          style={styles.elementScrollView}>
            <Text style={styles.testTitleText}>{testElment.label}</Text>
            <View style={null}>
              <Text style={styles.tagText}>
                {generateTags(testElment.tagList)}
              </Text>
            </View>
          <Text style={null}>{testElment.desc}</Text>
        </TouchableOpacity>
      );
    })
    return (
      <ScrollView
        StickyHeaderComponent={null}
        contentContainerStyle={styles.homeScrollView}>
          {layout}
          <View style={styles.homeFooter}>
            <Text style={styles.testTitleText}>Get to know your results!</Text>
            <Button
              style={[{margin: 10}]}
              title="Check"
              onPress={() => navigate('Results')}
            />
          </View>
      </ScrollView>
    );
  }

  // ----------------------------------- Result Screeen ------------------------------------------

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(function(){setRefreshing(false)} , 3000) ;
  }, []);

  const firstResultRow = [{
    "nick": "Nick",
    "score": "Score",
    "total": "Total",
    "type": "Type",
    "date": "Date"
    }]

  const Item = ({item}) => (
    <View style={styles.resultItem}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  const generateTableRow = (resultObj) => {
    let keys = Object.values(resultObj)
    let layout = keys.map( function(key){
      return (<Item item={key}></Item>)
    })
    return layout
  }

  const renderItem = ({ item }) => {
     return (<View style={styles.resultContainer}><Item item={item.nick}></Item>
        <Item item={item.score}></Item>
        <Item item={item.total}></Item>
        <Item item={item.type}></Item>
        <Item item={item.date}></Item></View>
      );
  };

  const ResultScreen = () => {
    console.log(results)
    return (
      <View>
      {/* <View style={styles.resultContainer}>*/}
        {/* {generateTableRow(firstResultRow[0])}
        {results.map(generateTableRow)} */}
        {/* {generateTableRow(firstResultRow[0])} */}
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.nick+' '+item.date+' '+item.score+' '+item.type+Math.floor(Math.random() * (9999 - 0))}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      {/* </View>*/}
      </View>
    )
  }

  // -------------------------------------- Navigation Drawer -------------------------------------

  const Seperator = () => <View style={styles.separator} />; 

  // const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const NavigationItem = ( props ) => {
    return (
      <TouchableOpacity
          style={styles.navItemContainer}
          onPress={() => {
            // Navigate using the `navigation` prop that you received
            props.navigation.navigate(props.screenName, {testId: props.testId});
          }}
        >
          <Text style={styles.navItem}>{props.screenNameUI}</Text>
      </TouchableOpacity>
    )
  }

  const NavigationButton = ( props ) => {
    return (
      <TouchableOpacity
          style={styles.navItemContainer}
          onPress={() => onChangeTerms(false)}
        >
          <Text style={styles.navItem}>{props.screenNameUI}</Text>
      </TouchableOpacity>
    )
  }

  const CustomDrawerContent = ({ navigation, route }) => {
    return (
      <View>
        <NavigationItem screenName="Home" screenNameUI="Home" navigation={navigation} route={route}/>
        <NavigationItem screenName="Results" screenNameUI="Results" navigation={navigation} route={route}/>
        <View style={[{borderBottomWidth: 2, borderColor: "#000000", margin: 10}]}/>
        <NavigationItem screenName="Test-1" screenNameUI="Test 1" navigation={navigation} route={route} testId={21}/>
        <NavigationItem screenName="Test 2" screenNameUI="Results" navigation={navigation} route={route}/>
        <NavigationButton screenNameUI="Terms of Usage"/>
      </View>
    );
  }

  // ------------------------------------------------------------------------- Drawing app ------------------------

  if ( canIskipTermsOfUsage ) {
    return (
      <NavigationContainer onReady={() =>  RNBootSplash.hide({ fade: true })}>
        {/* <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator> */}
        <Drawer.Navigator initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation, route }) => ({HomeScreen})}
          />
          <Drawer.Screen
            name="Results"
            component={ResultScreen}
            options={({ navigation, route }) => ({ResultScreen})}
          />
          <Drawer.Screen
            name="Test-1"
            component={TestScreen}
            options={({ navigation, route }) => ({TestScreen})}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <View style={styles.termsConatainer}>
        <Text>Our terms of usage:</Text>
        <View style={styles.termsTextContainer}>
          <ScrollView 
            contentContainerStyle={styles.termsScrollViewContainer} 
            style={styles.termsTextScrollView}
            persistentScrollbar={true}>
            <Text style={styles.termsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tempus pharetra. Ut elementum tempus felis id fringilla. Aliquam vel nibh sed risus tristique egestas. Quisque mollis lectus eu felis fermentum sodales. Sed ornare lacinia erat sed dapibus. Vivamus dui massa, dapibus id pulvinar volutpat, sollicitudin in odio. Aenean lobortis nisl et efficitur bibendum. Vestibulum feugiat massa in rhoncus pellentesque. Nunc lobortis arcu id arcu aliquam pulvinar. Nam et massa posuere, efficitur mi nec, feugiat nisl. Curabitur at consectetur dui, at eleifend libero. Vestibulum urna lorem, fringilla vel ex vel, tincidunt pretium nunc. Phasellus mattis posuere efficitur. Sed at odio tempus eros commodo semper.

  Cras convallis velit vitae ex molestie sodales. Aenean convallis pellentesque risus, eget finibus mauris facilisis eu. Maecenas risus velit, semper quis scelerisque sit amet, vulputate et justo. Donec dictum volutpat elit, ut lobortis dui. Vestibulum bibendum libero ac mi condimentum faucibus. Mauris hendrerit pulvinar risus, sit amet vehicula odio consectetur quis. Nullam ultrices lorem eget elit fringilla cursus. Curabitur ultricies nulla quis tellus bibendum gravida. Vestibulum eleifend in erat at dictum. Aliquam ante ex, vulputate at imperdiet sit amet, auctor nec massa. Duis sit amet posuere leo. Nulla ut tortor quis neque tristique facilisis ut quis metus.

  Fusce mattis vitae nulla in varius. In eget lobortis dolor. Aliquam erat volutpat. In eu massa quis mi vehicula fringilla a id urna. Vivamus sodales lectus sapien, volutpat scelerisque orci finibus non. Nam commodo, elit vitae finibus porttitor, quam nunc malesuada justo, ac placerat felis massa ut nunc. Etiam finibus lacinia purus in mollis. Aliquam ullamcorper magna in sem semper, condimentum convallis magna egestas. Nullam accumsan arcu at ipsum faucibus ornare. Morbi tristique faucibus purus, nec dictum urna mollis at. Nullam nec orci congue, cursus massa ut, rhoncus mauris. Pellentesque ut leo in tellus hendrerit semper. Nulla mattis eros non nibh rutrum fringilla. Pellentesque sodales porta egestas. Etiam in luctus tortor, et gravida tellus.

  Sed eu ex sapien. Sed viverra velit vel euismod ultrices. Vivamus a posuere turpis. Curabitur sed dolor vitae massa porta placerat id quis felis. Quisque vitae volutpat elit. Vestibulum convallis dolor ipsum, ac mollis lorem iaculis eu. In imperdiet risus at justo vestibulum fermentum. Morbi id mauris egestas, egestas ex et, ultricies dui. Pellentesque nec rhoncus tortor.

  Mauris volutpat porttitor tortor, ut pretium dolor lobortis a. Praesent placerat neque pulvinar, congue augue vel, faucibus lorem. Donec nec purus porta, finibus risus et, tincidunt tellus. Aenean vulputate finibus lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque in ante ut eros finibus pharetra. Praesent feugiat nibh a nunc semper rutrum. Quisque tincidunt urna eu erat sollicitudin, eget condimentum purus vehicula. Maecenas quis dui ipsum.

  In nec dui diam. Ut sed libero egestas, dapibus leo dapibus, mattis risus. Donec posuere aliquam mi in varius. Donec tincidunt sit amet turpis sodales molestie. Nullam quis elit et lectus eleifend finibus vitae vulputate mi. Pellentesque magna neque, fermentum vel ex a, pharetra semper risus. Maecenas pulvinar tincidunt eros non semper. Praesent sagittis ex non velit sagittis, sed auctor leo iaculis. Donec id fermentum libero. Fusce luctus, nunc quis venenatis ornare, tortor dolor auctor mauris, non feugiat metus sem nec eros.

  Morbi sodales est ut quam blandit placerat. Aenean consectetur lacus nisi, vel faucibus arcu dapibus in. Mauris dictum condimentum est, id accumsan elit pharetra dapibus. Nam ut facilisis mi. Sed tempus odio sapien, dictum finibus urna facilisis vel. Proin sit amet commodo enim. Proin luctus leo vitae dolor porttitor faucibus. Cras vestibulum, orci quis pretium bibendum, risus felis sagittis erat, at pretium dui purus a urna. Proin feugiat facilisis mattis. Donec lorem mi, pulvinar et tellus vel, laoreet commodo elit. Praesent orci magna, lacinia sed luctus ac, iaculis sed velit. Duis non blandit velit, a vulputate massa. Donec efficitur vehicula consectetur. Nulla venenatis malesuada tellus ut egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse vehicula sem in turpis iaculis, vitae pharetra velit laoreet.

  Duis quis dignissim magna. Nullam maximus urna risus, sit amet suscipit enim malesuada ut. Maecenas commodo urna ut dignissim imperdiet. Quisque semper neque in enim ornare posuere. Aliquam et scelerisque dui, et malesuada odio. Phasellus sollicitudin finibus dui. Maecenas ligula risus, dapibus non sollicitudin in, volutpat non diam. Ut rutrum ultrices risus vitae pharetra.

  Nulla facilisi. Etiam vulputate nec arcu vitae convallis. Praesent nec purus ac arcu rhoncus mollis ut et risus. Proin dictum tempus gravida. Vestibulum pulvinar porta ante et semper. Proin consectetur felis mi, eu molestie quam volutpat eget. Curabitur sit amet nisi id mi rutrum tempus eu ut lorem. Fusce fermentum turpis ac posuere sollicitudin. Sed finibus mollis euismod. Nullam eget ex at odio pretium pulvinar. Vivamus convallis augue mi, quis malesuada lectus condimentum a. Morbi ullamcorper, diam a varius porta, justo felis rutrum massa, ac ullamcorper lectus velit sit amet metus. Mauris ac quam lacinia, cursus sem eu, vehicula nisl. Duis maximus nibh felis, vitae tempor velit congue sit amet. Suspendisse maximus sapien in odio accumsan, sit amet commodo massa efficitur. Sed porta, urna nec lacinia viverra, ex est pulvinar velit, eu pretium sem orci in sapien.

  Donec fermentum justo ac commodo consequat. Sed et diam lectus. Integer faucibus tortor vel dapibus fringilla. Donec finibus tellus nec feugiat ultricies. Nullam at enim vitae dolor convallis sagittis vel tincidunt lectus. Curabitur mauris lectus, facilisis sit amet nibh et, venenatis pretium massa. Fusce id iaculis nibh. Morbi in luctus mauris. Nam in pharetra mi. Vestibulum et nulla id arcu finibus condimentum non sed tortor. Donec fermentum elementum magna, in placerat elit ultricies a.

  Nulla facilisi. Etiam in tellus tempor orci lacinia ultricies. Proin at aliquam ante. Cras urna nulla, lobortis at pharetra et, sagittis et felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet pharetra magna, in ultrices purus. Cras facilisis tortor vel pulvinar rutrum. Nam elementum ullamcorper sem. Curabitur rutrum velit ac diam luctus, eget blandit orci dapibus. Maecenas tempor accumsan imperdiet. Vivamus sit amet quam lectus. Nam fringilla libero augue, eget dapibus nisl scelerisque vel. Proin nulla justo, iaculis in dui in, ultricies porta odio. Sed consequat, mauris vitae ultrices dapibus, leo massa viverra neque, et laoreet turpis ligula et metus. Fusce sit amet mollis nulla. Phasellus lacinia dignissim euismod.
            </Text>
          </ScrollView>
        </View>
        <TextInput
          style={styles.termsNickInput}
          onChangeText={onChangeNick}
          value={nick}
          placeholder="enter your nick here"
        />
        <Button
          style={styles.termsButton}
          title="I accept terms of usage"
          onPress={() => storeData()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  homeScrollView: {
    margin: 10,
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    flexGrow: 1
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  elementScrollView: {
    width: "90%",
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: "#9E9D9F",
    margin: 10,
  },
  testTitleText: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  tagText: {
    color: "#229AFF",
  },
  homeFooter: {
    margin: 10,
    padding: 10,
    width: "100%",
    borderTopColor: "#9E9D9F",
    borderTopWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center'
  },
  navItemContainer: {
    alignItems: 'center',
    width: "100%",
  },
  navItem: {
    margin: 10,
    fontSize: 26,
  },
  termsConatainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    paddingTop: 40,
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
  },
  termsTextContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  termsTextScrollView: {
    // borderWidth: 1,
    padding: 0,
    width: "80%",
  }, 
  termsScrollViewContainer: {
    padding: 10,
  },
  termsText: {
    color: '#FFFFFF',
  },
  termsNickInput: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  termsButton: {
    width: 70,
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginTop: -10,
    padding: 15,
    width: "100%",
  },
  resultItem: {
    width: "16%",
    height: 30,
    padding: 5,
    flexGrow: 1,
    borderWidth: 1,
    margin: 4,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 11,
  },
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

export default App;
