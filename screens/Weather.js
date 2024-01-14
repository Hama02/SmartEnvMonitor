import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import background1 from "../assets/background3.png";
import background2 from "../assets/background5.png";
import { db, ref, onValue } from "../firebase";

const Weather = () => {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [background, setBackground] = useState(background1);

  useEffect(() => {
    const data = ref(db);
    onValue(data, (snapshot) => {
      setTemp(snapshot.val().temp);
      setHumidity(snapshot.val().humid);
    });
  }, [db]);

  useEffect(() => {
    temp > 29 ? setBackground(background2) : setBackground(background1);
  }, [temp]);
  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.tempWrapper}>
        <Text style={styles.text}>{Math.round(temp)}°</Text>
      </View>
      <View style={styles.data}>
        <View style={styles.spacer}></View>
        <View style={styles.dataWrapper}>
          <View style={styles.humid}>
            <Text style={styles.dataText}>{humidity}%</Text>
            <Text style={styles.title}>Humidity</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  tempWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 120,
    fontWeight: "100",
    textAlign: "right",
    color: "white",
    paddingRight: 35,
  },
  data: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  spacer: {
    height: "30%",
  },
  dataWrapper: {
    marginTop: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
  },

  humid: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressure: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dataText: {
    fontSize: 20,
    fontWeight: "200",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
