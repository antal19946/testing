import * as Location from "expo-location";
import i18n from "i18n-js";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler, SafeAreaView
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { en, sw } from "./Action/Store/Language";
import Header from "./Header";
import Navbar from "./Navbar";
import moment from 'moment'
import Geocoder from "react-native-geocoding";
Geocoder.init("AIzaSyC9Mif-Mxfm6nU2_79jiAkpxv7O8jPfLYQ");

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const Weather = ({ navigation }) => {
  const mynum = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  i18n.fallbacks = true;
  i18n.translations = { en, sw };
  i18n.locale = mynum;
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherDetails, setWeather] = useState(null);
  const [Searchbar, setSearchbar] = useState(false);
  const [weatherdata, setWeatherdata] = useState(null);
  const [location, setLocation] = useState(false);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log(errorMsg);
        return;
      }

      console.log("location");
      try {
        let location = await Location.getCurrentPositionAsync();
        console.log(location);
        getWeatherDetails(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    })();
  }, []);

  function getWeatherImage(weather, style) {
    let source = null;
    if (weather == 0) {
      source = require("../assets/Sunlogo.png");
    } else if (weather == 1 || weather == 2 || weather == 3) {
      source = require("../assets/icons/clear-sky.png");
    } else if (weather == 45 || weather == 48) {
      source = require("../assets/icons/fog.png");
    } else if (weather == 51 || weather == 53 || weather == 55) {
      source = require("../assets/icons/drizzle.png");
    } else if (weather == 56 || weather == 57) {
      source = require("../assets/icons/snow.png");
    } else if (weather == 61 || weather == 63 || weather == 65) {
      source = require("../assets/icons/rain.png");
    } else if (weather == 66 || weather == 67) {
      source = require("../assets/icons/snowflake.png");
    } else if (weather == 73 || weather == 71 || weather == 75) {
      source = require("../assets/icons/snow.png");
    } else if (weather == 80 || weather == 81 || weather == 82) {
      source = require("../assets/icons/shower.png");
    } else if (weather == 86 || weather == 85) {
      source = require("../assets/icons/snowshower.png");
    } else if (weather == 95 || weather == 96 || weather == 99) {
      source = require("../assets/icons/thunderstorm.png");
    }
    return <Image source={source} style={style} />;
  }

  function getWeatherName(weather) {
    let name = null;
    if (weather == 0) {
      name = "Clear Sky";
    } else if (weather == 1 || weather == 2 || weather == 3) {
      name = "Partly Cloudy";
    } else if (weather == 45 || weather == 48) {
      name = "Fog";
    } else if (weather == 51 || weather == 53 || weather == 55) {
      name = "Drizzle";
    } else if (weather == 56 || weather == 57) {
      name = "Snow";
    } else if (weather == 61 || weather == 63 || weather == 65) {
      name = "Rain";
    } else if (weather == 66 || weather == 67) {
      name = "Snowflake";
    } else if (weather == 73 || weather == 71 || weather == 75) {
      name = "Snow";
    } else if (weather == 80 || weather == 81 || weather == 82) {
      name = "Rain Shower";
    } else if (weather == 86 || weather == 85) {
      name = "Snow Shower";
    } else if (weather == 95 || weather == 96 || weather == 99) {
      name = "Thunderstorm";
    }
    return name;
  }

  const getWeatherDetails = async (lat, long) => {
    let startDate = new Date().toISOString().toString().split("T")[0];
    let endDate = new Date(moment().add(7, 'days')).toISOString().toString().split("T")[0];
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,weathercode,cloudcover&current_weather=true&windspeed_unit=ms&timezone=Asia%2FBangkok&start_date=${startDate}&end_date=${endDate}`;
    const weatherapi = await fetch(url);
    console.log(url)
    const apiData = await weatherapi.json();
    if (apiData.current_weather) {
      let hour = [];
      let currentHour = new Date().getHours();
      setTimeout(() => {
        setWeather({ temperature: apiData.current_weather.temperature || 0, windspeed: apiData.current_weather.windspeed || 0, weathercode: apiData.current_weather.weathercode || 0 });
      }, 0);

      for (let i = 0; i < apiData.hourly.time.length; i++) {
        if (apiData.hourly.time[i].includes(`T${currentHour}`)) {
          if (apiData.hourly.time[i].split('T')[0] == new Date().toISOString().split('T')[0]) {
            setTimeout(() => {
              console.log(weatherDetails)
              setWeather({ temperature: apiData.current_weather.temperature || 0, windspeed: apiData.current_weather.windspeed || 0, weathercode: apiData.current_weather.weathercode || 0, coverage: apiData.hourly.cloudcover[i] || 0, humidity: apiData.hourly.relativehumidity_2m[i] || 0 })
            }, 0);

          }
          else {
            hour.push({
              time: moment(new Date(apiData.hourly.time[i]).toISOString()).format('DD, MMM'),
              weather: apiData.hourly.weathercode[i],
              temp: apiData.hourly.temperature_2m[i],
            });
          }
        }
      }
      setWeatherdata(hour);
    }
    Geocoder.from(lat, long)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address;
        let address = "";
        address += json.results[0].address_components.filter((x) =>
          x.types.includes("locality")
        )[0].long_name;

        address += ", ";
        address += json.results[0].address_components.filter((x) =>
          x.types.includes("country")
        )[0].long_name;
        setLocation(address);
      })
      .catch((error) => console.warn(error));
  };
  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [0]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.containerMain}>
          <Header
            Heading={i18n.t("Weather")}
            goBackBtn={() => navigation.goBack()}
            Notification={() => navigation.navigate("Notification")}
          />
          {weatherDetails ? (
            <ScrollView
              style={{ top: 5 }}
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                style={styles.searchLocationMain}
                onPress={() => setSearchbar(!Searchbar)}
              >
                <View style={styles.searchLocationInner}>
                  <Image
                    style={styles.searchLocationLogo}
                    source={require("../assets/locationiconjjjj.png")}
                  />
                  <View style={styles.searchMian}>
                    {!Searchbar && (
                      <View>
                        <Text style={styles.searchLocationTxt}>
                          {i18n.t("Location")}
                        </Text>
                        <Text style={styles.getLocationTxt}>{location}</Text>
                      </View>
                    )}
                    {Searchbar && (
                      <View style={styles.centeredView}>
                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={Searchbar}
                          onRequestClose={() => {
                            setSearchbar(!Searchbar);
                          }}
                        >
                          <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                              <GooglePlacesAutocomplete
                                styles={{
                                  container: {
                                    width: "100%",
                                  },
                                  textInputContainer: {
                                    marginLeft: "5%",
                                    width: "90%",
                                  },
                                  textInput: {
                                    borderWidth: 1,
                                    borderColor: "#666",
                                    borderRadius: 10,
                                    width: "100%",
                                  },
                                }}
                                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                                fetchDetails={true}
                                placeholder="Search"
                                onPress={(data, details = null) => {
                                  if (
                                    details &&
                                    details.geometry &&
                                    details.geometry.location
                                  ) {
                                    getWeatherDetails(
                                      details.geometry.location.lat,
                                      details.geometry.location.lng
                                    );
                                    setSearchbar(!Searchbar);
                                  }
                                }}
                                query={{
                                  key: "AIzaSyC9Mif-Mxfm6nU2_79jiAkpxv7O8jPfLYQ",
                                  language: "en",
                                }}
                              />
                              <Pressable
                                style={styles.buttonClose}
                                onPress={() => setSearchbar(!Searchbar)}
                              >
                                <Text style={styles.textStyle}>Back</Text>
                              </Pressable>
                            </View>
                          </View>
                        </Modal>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.weathermain}>
                <View style={styles.todayMain}>
                  <Text style={styles.todayTxt}>{i18n.t("Today")}</Text>
                  <Text style={styles.dateTxt}>{new Date().toGMTString().split(' 202')[0]
                  }</Text>
                </View>
                <View style={styles.tampMain}>
                  {getWeatherImage(weatherDetails.weathercode, styles.imageCurrent)}

                  <View style={styles.tampratureMain}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={styles.tampTxt}>
                        {Math.floor(weatherDetails.temperature)}°
                      </Text>
                      <Text style={styles.celTxt}>C</Text>
                    </View>
                    <View>
                      <Text style={styles.sunny}>
                        {getWeatherName(weatherDetails.weathercode)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rainMain}>
                  <View style={styles.rain}>
                    <Image
                      style={styles.rainlogo}
                      source={require("../assets/windlogo.png")}
                    />
                    <Text style={styles.rainTxt}>{weatherDetails.windspeed}m/s</Text>
                  </View>
                  <View style={styles.rain}>
                    <Image
                      style={styles.rainlogo}
                      source={require("../assets/rainlogo.png")}
                    />
                    <Text style={styles.rainTxt}>{weatherDetails.humidity}%</Text>
                  </View>
                  <View style={styles.rain}>
                    <Image
                      style={styles.rainlogo}
                      source={require("../assets/ranelogo2.png")}
                    />
                    <Text style={styles.rainTxt}>{weatherDetails.coverage}%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.rightScroll}>
                <Text style={styles.TodayHeading}>{i18n.t("Today")}</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {weatherdata &&
                    weatherdata.map((item, ind) => {
                      return (
                        <View key={ind} style={styles.TodayWeather}>
                          <Text style={styles.timeTxt}>{item.time}</Text>
                          {getWeatherImage(item.weather, styles.TodayWeatherImg)}
                          <Text style={styles.tempdata}>{item.temp}°C</Text>
                        </View>
                      );
                    })}
                </ScrollView>
              </View>
            </ScrollView>
          ) : (
            <View style={[styles.loading_container, styles.loading_horizontal]}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
        <Navbar
          Profile={() => navigation.navigate("MyProfile")}
          Quastion={() => navigation.navigate("Agronomist")}
          Home={() => navigation.navigate("Dashboard")}
          Weather={() => navigation.navigate("Weather")}
          Menu={() => navigation.navigate("Settings")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  loading_container: {
    flex: 1,
    justifyContent: "center",
  },
  loading_horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  containerMain: {
    height: height - 150,
    width: "100%",
    overflow: "hidden",
  },
  bgImg: {
    height: "100%",
    width: "100%",
  },
  headerMain: {
    width: "100%",
    height: 100,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fca237",
  },
  headerHeadingMain: {
    width: "95%",
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  headerHeading: {
    fontSize: 24,
    color: "#fff",
    marginHorizontal: 2,
  },
  searchLocationMain: {
    width: "90%",
    height: 70,
    borderRadius: 15,
    backgroundColor: "#fff8f0",
    borderBottomColor: "rgba(0,0,0,0.056)",
    borderBottomWidth: 1,
    borderRightColor: "rgba(0,0,0,0.046)",
    borderRightWidth: 0.8,
    borderLeftColor: "rgba(0,0,0,0.046)",
    borderLeftWidth: 0.8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  searchLocationInner: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchMian: {
    height: "100%",
    width: "60%",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  searchLocationTxt: {
    fontSize: 14,
    color: "#414141",
    fontWeight: "bold",
    marginVertical: 10,
  },
  getLocationTxt: {
    fontSize: 14,
    color: "#848484",
  },
  weathermain: {
    width: "100%",
    height: 321,
    backgroundColor: "#73a2fa",
    alignItems: "center",
    justifyContent: "space-around",
  },
  todayMain: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  todayTxt: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "900",
  },
  dateTxt: {
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
  tampMain: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tampratureMain: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginHorizontal: 10,
    right: 0,
  },
  tampTxt: {
    fontSize: 43,
    color: "#fff",
    fontWeight: "900",
  },
  celTxt: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500",
    marginTop: 5,
  },
  sunny: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  rainMain: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  rain: {
    justifyContent: "center",
    alignItems: "center",
  },
  rightScroll: {
    height: 200,
    marginBottom: 0,
    justifyContent: "center",
    // alignItems:'center'
  },
  TodayWeather: {
    height: 116,
    width: 71,
    borderRadius: 20,
    borderColor: "#cbd9fc",
    marginHorizontal: 8,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    backgroundColor: "#f8faff",
    // backgroundColor:'#b4c9ff'
  },
  timeTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "#b4c9ff",
  },
  tempdata: {
    fontSize: 20,
    fontWeight: "500",
    color: "#b4c9ff",
  },
  TodayHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    margin: 15,
  },
  rainTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  centeredView: {
    flex: 1,
    alignContent: "stretch",
  },
  modalView: {
    marginTop: 60,
    width: 100 + "%",
    backgroundColor: "#fff",
    height: 100 + "%",
    paddingTop: 35,

    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  imageCurrent: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },
  TodayWeatherImg: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  buttonClose: {
    width: "90%",
    marginLeft: "5%",
    marginBottom: 20,
    height: 50,
    backgroundColor: "#fca237",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  searchLocationLogo:{
    height:50,
    width:50
  }
});