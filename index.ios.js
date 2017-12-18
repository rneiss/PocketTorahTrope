/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
const parseString = require('react-native-xml2js').parseString;

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Button,
  Modal,
  Slider,

} from 'react-native';
var RNFS = require('react-native-fs');
timeChecker = "";

var reactMixin = require('react-mixin');
var TimerMixin = require('react-timer-mixin');


import {
  StackNavigator,
} from 'react-navigation';


// Import the react-native-sound module
var Sound = require('react-native-sound');

// Enable playback in silence mode (iOS only)
Sound.setCategory('Playback');


class CustomButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.doOnPress} style={this.props.style ? this.props.style : null}>
        <Text style={styles.button}>
          {this.props.buttonTitle}
        </Text>
      </TouchableOpacity>
    );
  }
}

class FooterButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.doOnPress} style={this.props.style ? this.props.style : null}>
        <Text style={styles.footerButtonInner}>
          {this.props.buttonTitle}
        </Text>
      </TouchableOpacity>
    );
  }
}


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
        <CustomButton doOnPress={() => navigate('TropePhrases')} buttonTitle="List of Trope Phrases"/>
        <CustomButton doOnPress={() => navigate('About')} buttonTitle="About this App"/>
      </ScrollView>
    );
  }
}

class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  };

  render() {
    return (
      <View style={styles.aboutPage}>
        <Text style={styles.aboutPageText}>PocketTorah Trope is a labor of love maintained by Russel Neiss & Charlie
          Schwartz.</Text>
        <Text style={styles.aboutPageText}>Initially funded by the Jewish New Media Innovation Fund, PocketTorah is
          designed to help you learn the weekly Torah and Haftarah portions anywhere, at any time, for free.</Text>
        <Text style={styles.aboutPageText}>If you like it, or find it useful, please consider making a donation to the
          Jewish charity of your choice.</Text>
        <Text style={styles.aboutPageHeader}>Trope Provided by:</Text>
        <View>
          <Text style={styles.aboutPageListItem}>Cantor Elizabeth K. Sacks</Text>
        </View>



      </View>
    );
  }
}

class TropePhrases extends React.Component {
  static navigationOptions = {
    title: 'Trope Phrases',
  };

  render() {
    const {params} = this.props.navigation.state;
    const {navigate} = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <CustomButton doOnPress={() => navigate('TropeSelectScreen', {
            tropeType: "torah",
            title:"Torah",
            tropeArray: ["אֶתְנַחְתָּ֑א", "סוֹף פָּסֽוּק", "זָקֵף קָטָ֔ן", "רְבִ֗יע", "קַדְמָ֨א ואַזְלָ֝א", "גֵּרְשַׁ֞יִם/גֵּ֜רֵשׁ", "תְּבִ֛יר", "תְּלִישָא", "פָּזֵ֡ר", "יְ֚תִיב קָטָ֔ן", "זָקֵף גָּד֕וֹל", "זַרְקָא֘"]
          })} buttonTitle="Torah"/>
          <CustomButton doOnPress={() => navigate('TropeSelectScreen', {
            tropeType: "haftarah",
            title:"Haftarah",
            tropeArray: ["אֶתְנַחְתָּ֑א", "סוֹף פָּסֽוּק", "קָטָ֔ן", "רְבִ֗יע", "תְּבִ֛יר", "גֵּ֜רֵשׁ", "גֵּרְשַׁ֞יִם", "תְּלִישָא", "יְ֚תִיב קָטָ֔ן", "זָקֵף גָּד֕וֹל", "זַרְקָא֘", "פָּזֵ֡ר", "קַדְמָ֨א ואַזְלָ֝א", "מֵרְכָא כּפוּלָ֦ה", "Sof Haftorah"]
          })} buttonTitle="Haftarah"/>
          <CustomButton doOnPress={() => navigate('TropeSelectScreen', {
            tropeType: "esther",
            title:"Esther",
            tropeArray: ["אֶתְנַחְתָּ֑א", "סוֹף פָּסֽוּק", "קָטָ֔ן", "רְבִ֗יע", "תְּבִ֛יר", "גֵּ֜רֵשׁ", "גֵּרְשַׁ֞יִם", "תְּלִישָא", "יְ֚תִיב קָטָ֔ן", "זָקֵף גָּד֕וֹל", "זַרְקָא֘", "פָּזֵ֡ר", "קַדְמָ֨א ואַזְלָ֝א", "Sof Perek", "קַרְנֵי פָרָ֟ה", "יֵרֶח בֶּן יוֹמ֪וֹ"]
          })} buttonTitle="Esther"/>
          <CustomButton doOnPress={() => navigate('TropeSelectScreen', {
            tropeType: "eicha",
            title:"Eicha",
            tropeArray: ["אֶתְנַחְתָּ֑א", "סוֹף פָּסֽוּק", "פַּשְׁטָא֙ קָטָ֔ן", "רְבִ֗יע", "תְּבִ֛יר", "גֵּ֜רֵשׁ", "גֵּרְשַׁ֞יִם", "תְּלִישָא", "יְ֚תִיב קָטָ֔ן", "זָקֵף גָּד֕וֹל", "זַרְקָא֘", "End of Chapter"]
          })} buttonTitle="Eicha"/>
          <CustomButton doOnPress={() => navigate('TropeSelectScreen', {
            tropeType: "3megillot",
            title:"Three Megillot",
            tropeArray: ["אֶתְנַחְתָּ֑א", "סוֹף פָּסֽוּק", "קָטָ֔ן", "רְבִ֗יע", "תְּבִ֛יר", "גֵּ֜רֵשׁ", "גֵּרְשַׁ֞יִם", "תְּלִישָא", "יְ֚תִיב קָטָ֔ן", "זָקֵף גָּד֕וֹל", "זַרְקָא֘", "פָּזֵ֡ר", "קַדְמָ֨א ואַזְלָ֝א", "Sof Perek"]
          })} buttonTitle="Three Megillot"/>
          <CustomButton doOnPress={() => navigate('TropeSelectScreen', {
            tropeType: "hhd",
            title:"High Holiday",
            tropeArray: ["אֶתְנַחְתָּ֑א", "סוֹף פָּסֽוּק", "קָטָ֔ן", "רְבִ֗יע", "תְּבִ֛יר", "גֵּ֜רֵשׁ", "גֵּרְשַׁ֞יִם", "תְּלִישָא", "יְ֚תִיב קָטָ֔ן", "זָקֵף גָּד֕וֹל", "זַרְקָא֘", "פָּזֵ֡ר", "קַדְמָ֨א ואַזְלָ֝א", "Sof Perek"]
          })} buttonTitle="High Holiday"/>
        </ScrollView>
      </View>
    );
  }
}

class TropeSelectScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
  });




  render() {

    const {params} = this.props.navigation.state;
    const {navigate} = this.props.navigation;
    var content = params.tropeArray.map((obj, index) => (
      <CustomButton doOnPress={() => navigate('PlayViewScreen', {tropeType: params.tropeType, tropeIndex: index + 1, title: obj})}
                    buttonTitle={obj}/>));
    return (
      <ScrollView>
        {content}
      </ScrollView>
    );
  }
}


class PlayViewScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    const {renderHeaderRight} = state.params;
    return {
      title: `${navigation.state.params.title}`,
     // headerRight: renderHeaderRight && renderHeaderRight()
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({
     // renderHeaderRight: () => <Button title={"Settings"} onPress={() => this.toggleSettingsModal('open')}/>
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      labels: null,
      tropeText: null,
      activeWordIndex: 0,
      audioPlaying: false,
      tikkunOn: false,
      modalVisible: false,
      textSizeMultiplier: 1,
      currentAudioTime: 0,
    };
    this.changeAudioTime = this.changeAudioTime.bind(this);

  }


  checkTime() {
    this.clearInterval(timeChecker);

    var wordIndex = this.state.activeWordIndex;
    if (!this.state.audio || !this.state.labels) {
      return
    }

    this.state.audio.getCurrentTime((curTime) => {
      var changeTime = parseFloat(this.state.labels[wordIndex + 1]);
      if (curTime > changeTime) {
        this.setState({
          activeWordIndex: wordIndex + 1
        });
      }
    });
    timeChecker = this.setTimeout(() => {
      this.checkTime()
    });

  }

  toggleAudio(action) {
    if (action == 'play') {

      this.state.audio.play();
      this.setState({audioPlaying: true});

      this.setInterval(() => {
        this.state.audio.getCurrentTime((curTime) => {
          this.setState({
            currentAudioTime: curTime
          });
        });
      }, 50);

    }
    else {
      this.state.audio.pause();
      this.setState({audioPlaying: false});
    }
  }

  changeAudioTime(wordIndex) {
    if (!this.state.audio || !this.state.labels) {
      return
    }
    this.toggleAudio('pause');
    var newTime = parseFloat(this.state.labels[wordIndex]);
    this.state.audio.setCurrentTime(newTime);
    this.setState({activeWordIndex: wordIndex});
    this.toggleAudio('play');
  }


  toggleSettingsModal(action) {
    if (action == 'open') {
      this.setState({modalVisible: true});
    }
    else {
      this.setState({modalVisible: false});
    }
  }


  componentDidMount() {
    var {params} = this.props.navigation.state;

    var audioFileName = "audio/" + params.tropeType + "-" + params.tropeIndex + ".mp3";
    var aliyahAudio = new Sound(audioFileName, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      this.setState({audio: aliyahAudio});
    });


    RNFS.readFile(RNFS.MainBundlePath + '/labels/' + params.tropeType + '-' + params.tropeIndex + '.txt') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((contents) => {
        // log the file contents
        this.setState({
          labels: contents.split(','),
        });

      })
      .catch((err) => {
        console.log(err.message, err.code);
      });


    RNFS.readFile(RNFS.MainBundlePath + '/text/' + params.tropeType + '-' + params.tropeIndex + '.xml') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((contents) => {
        // log the file contents
        this.setState({
          tropeText: contents
        });

      })
      .catch((err) => {
        console.log(err.message, err.code);
      });


  }

  componentWillUnmount() {
    this.state.audio.release();
  }



  getVerseWords(verse, curWordIndex) {
      var words = verse.map((word, i) =>
        <View style={styles.text}>
          <TouchableOpacity onPress={() => {
            this.changeAudioTime(curWordIndex + i)
          }}>
            <Text
              style={parseFloat(this.state.labels[curWordIndex + i]) < this.state.currentAudioTime && parseFloat(this.state.labels[curWordIndex + i + 1]) > this.state.currentAudioTime ? [styles.word, styles.active, {fontSize: 30 * this.state.textSizeMultiplier}] : [styles.word, {fontSize: 30 * this.state.textSizeMultiplier}]}>
              {verse[i].replace(/\//g, '').replace(/[\u0591-\u05C7]/g, "")}
            </Text>
          </TouchableOpacity>
        </View>
      );

      return words;
  }


  render() {

    if (!this.state.audio || !this.state.labels || !this.state.tropeText) {
      return (
        <View>
          <ActivityIndicator
            size="large"
          />
          <Text>Loading....</Text>
        </View>
      );

    }

    else {
      const {params} = this.props.navigation.state;
      var wordFontSize = 24 * parseFloat(this.state.textSizeMultiplier);
      var stamFontSize = 20 * parseFloat(this.state.textSizeMultiplier);

      verseArray = []
      parseString(this.state.tropeText, function(err, result) {
        for (let i of result.c.v) {
          verseArray.push(i.w)
        }


      });


      var tropeWordIndex = 0;
      var words = [];


      for (var i = 0; i < verseArray.length; i++) {
        words.push(<View style={[styles.text, {fontSize: 36, textAlign: 'right'}]}><Text style={[{marginTop:11, marginLeft: 5}]}>{i+1}. </Text>{this.getVerseWords(verseArray[i],tropeWordIndex)}</View>)

      tropeWordIndex = tropeWordIndex + verseArray[i].length;
      }

      return (
        <View style={{flex: 1}}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              console.log("Modal has been closed.")
            }}
          >
            <View style={{marginTop: 22}}>
              <View>
                <Text style={styles.modalHeader}>Settings</Text>
                <View style={styles.modalSection}>
                  <Text>Font Size:</Text>
                  <Slider minimumValue={.5} maximumValue={2} value={this.state.textSizeMultiplier}
                          onSlidingComplete={(value) => this.setState({textSizeMultiplier: value})}/>
                  <Text style={[styles.word, {fontSize: wordFontSize}]}>בְּרֵאשִׁ֖ית </Text>
                  <Text style={[styles.stam, {fontSize: stamFontSize}]}>בראשית </Text>
                </View>
                <View style={styles.modalSection}>
                  <Text>Set Audio Speed:</Text>
                  <Slider minimumValue={.5} maximumValue={2} value={1}
                          onValueChange={(value) => this.state.audio.setSpeed(value)}/>
                </View>

                <View style={styles.modalFooter}>
                  <CustomButton doOnPress={() => this.toggleSettingsModal('close')} buttonTitle="Save Settings"/>
                </View>

              </View>
            </View>
          </Modal>
          <ScrollView>
            {words}

          </ScrollView>
          <View style={styles.footer}>
            {this.state.audioPlaying ?
              <FooterButton style={styles.footerButton} doOnPress={() => this.toggleAudio('pause')}
                            buttonTitle="Pause"/> :
              <FooterButton style={styles.footerButton} doOnPress={() => this.toggleAudio('play')}
                            buttonTitle="Play"/> }
          </View>
        </View>
      );
    }
  }
}
reactMixin(PlayViewScreen.prototype, TimerMixin);



const PocketTorah = StackNavigator({
  Home: {screen: HomeScreen},
  About: {screen: AboutScreen},
  TropePhrases: {screen: TropePhrases},
  TropeSelectScreen: {screen: TropeSelectScreen},
  PlayViewScreen: {screen: PlayViewScreen},
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    top: 30,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ccc',
    textAlign: 'center',
  },

  text: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  word: {
    flex: 0,
    padding: 4,
    fontFamily: "Taamey Frank Taamim Fix",
  },
  stam: {
    flex: 0,
    padding: 4,
    fontFamily: "Stam Ashkenaz CLM",
  },
  active: {
    backgroundColor: '#ffff9d',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
  footerButton: {
    flexGrow: 1,
    width: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#efeff2',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#d9d9de',

  },
  footerButtonInner: {
    fontSize: 12,
    textAlign: 'center',
  },
  verseNum: {
    paddingTop: 10,
    fontSize: 10,
  },
  modalHeader: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalSection: {
    borderColor: '#d9d9de',
    borderTopWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  modalFooter: {
    marginTop: 50,
  },
  aboutPage: {
    margin: 10,
  },
  aboutPageText: {
    marginTop: 10,
  },
  aboutPageHeader: {
    fontWeight: "bold",
    marginTop: 10,
  },
  aboutPageListItem: {
    marginLeft: 10,
    marginTop: 5,
  },
});

AppRegistry.registerComponent('PocketTorah', () => PocketTorah);
