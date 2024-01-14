// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { db, ref, onValue } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const data = ref(db);
    onValue(data, (snapshot) => {
      setIsDark(snapshot.val().isDark);
    });
  }, [db]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#f5f5f5" },
      ]}
    >
      <Button
        style={styles.button}
        title="Check Weather"
        onPress={() => navigation.navigate("Weather")}
      />
      <Button
        style={styles.button}
        title="Controllers"
        onPress={() => navigation.navigate("Controllers")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});

export default HomeScreen;
