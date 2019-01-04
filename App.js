import React from 'react';
import {
StyleSheet,
View,
ImageBackground,
Text,
KeyboardAvoidingView,
Platform,
ActivityIndicator,
StatusBar,
} from 'react-native';
import { fetchLocationId, fetchWeather } from './api';
import getImageForWeather from './getImageForWeather';
import SearchInput from './components/SearchInput';
export default class App extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	location: 'San Francisco',
	};
  }
   componentDidMount() {
	this.handleUpdateLocation('San Francisco');
   
}
    handleUpdateLocation = async city => {
      if (!city) return;
      this.setState({ loading: true }, async () => {
      try {
      const locationId = await fetchLocationId(city);
      const { location, weather, temperature } = await fetchWeather(
      locationId,
      );
      this.setState({
      loading: false,
      error: false,
      location,
      weather,
      temperature,
      });
      } catch (e) {
      this.setState({
      loading: false,
      error: true,
      });
      }
      });
      };
      renderContent() {
        const { error } = this.state;
        return (
        <View>
        {error && <Text>Error</Text>}
        {!error && this.renderInfo()}
        </View>
        );
        }
        renderInfo() {
        const { info } = this.state;
        return <Text>{info}</Text>;
        }
        render() {
        const { loading } = this.state;
        return (
        <View>
        <ActivityIndicator animating={loading} color="white" size="large" />
        {!loading && this.renderContent()}
        </View>
       
        );
        }
      render() {
        const { loading, error, location, weather, temperature } = this.state;
        return (
          
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
        >
        <View style={styles.detailsContainer}>
        <ActivityIndicator animating={loading} color="white" size="large" />
        {!loading && (
<View>

{error && (
<Text style={[styles.smallText, styles.textStyle]}>
Could not load weather, please try a different city.
</Text>
)}
{!error && (
<View>
<Text style={[styles.largeText, styles.textStyle]}>
{location}
</Text>
<Text style={[styles.smallText, styles.textStyle]}>
{weather}
</Text>
<Text style={[styles.largeText, styles.textStyle]}>
{`${Math.round(temperature)}°`}
</Text>
</View>
)}
<SearchInput
placeholder="Search any city"
onSubmit={this.handleUpdateLocation}
/>

</View>
)}
<Text style={[styles.smallText, styles.textStyle]}>
        <Text>Yulian Kurnia Putra/ 2015150074</Text>
</Text>

</View>
	
    </ImageBackground>
    </KeyboardAvoidingView>


);
}
}


 const styles = StyleSheet.create({
   
   largeText: {
   fontSize: 44,
   },
   smallText: {
    fontSize: 18,
    },
    textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    },
   textStyle: {
    textAlign: 'center',
    ...Platform.select({
    ios: {
    fontFamily: 'AvenirNext-Regular',
    },
    android: {
    fontFamily: 'Roboto',
    },
    }),
    },
    container: {
      flex: 1,
      backgroundColor: '#34495E',
      },
      imageContainer: {
      flex: 1,
      },
      image: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
      },
      detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 20,
        },
        
});