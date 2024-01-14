import React, { useEffect, useState } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import { db, ref, onValue } from "../firebase";
import { set } from "firebase/database";

const Controllers = () => {
  const [isHumidOn, setIsTHumidOn] = useState(false);
  const [isAcOn, setIsAcOn] = useState(false);
  const [isCurtainOn, setIsCurtainOn] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const data = ref(db);
    onValue(data, (snapshot) => {
      setIsDark(snapshot.val().isDark);
    });
  }, [db]);

  const toggleHumid = () => setIsTHumidOn((previousState) => !previousState);

  const toggleCurtain = () => setIsCurtainOn((previousState) => !previousState);

  const toggleAc = () => setIsAcOn((previousState) => !previousState);

  const handleChange = async (attribute) => {
    try {
      set(
        ref(db, "/" + attribute),
        attribute === "ac_ON"
          ? isAcOn
          : attribute === "humid_ON"
          ? isHumidOn
          : isCurtainOn
      );
    } catch (error) {
      console.error("Error updating attribute:", error.message);
    }
  };

  useEffect(() => {
    handleChange("ac_ON");
  }, [isAcOn]);

  useEffect(() => {
    handleChange("humid_ON");
  }, [isHumidOn]);

  useEffect(() => {
    handleChange("curtain_ON");
  }, [isCurtainOn]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#f5f5f5" },
      ]}
    >
      {/* Temperature Toggle Button */}
      <View style={styles.toggleContainer}>
        <Text style={[styles.label, { color: isDark ? "white" : "black" }]}>
          Air Humidifier
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isHumidOn ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleHumid}
          value={isHumidOn}
        />
      </View>

      {/* AC Toggle Button */}
      <View style={styles.toggleContainer}>
        <Text style={[styles.label, { color: isDark ? "white" : "black" }]}>
          Air Conditioner
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isAcOn ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAc}
          value={isAcOn}
        />
      </View>
      {/* Curtain Toggle Button */}
      <View style={styles.toggleContainer}>
        <Text style={[styles.label, { color: isDark ? "white" : "black" }]}>
          Open the Curtain
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isCurtainOn ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleCurtain}
          value={isCurtainOn}
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default Controllers;
