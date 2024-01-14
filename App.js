// App.js
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import Weather from "./screens/Weather";
import Controllers from "./screens/Controllers";
import Toast, { BaseToast } from "react-native-toast-message";
import { db, ref, onValue } from "./firebase";

const Stack = createStackNavigator();

const App = () => {
  const showToast = (title, msg) => {
    Toast.show({
      type: "success",
      text1: title,
      text2: msg,
    });
  };

  useEffect(() => {
    const data = ref(db);
    onValue(data, (snapshot) => {
      let msg1 = snapshot.val().msg_humid;
      if (msg1 != "none") {
        showToast("High Humidity Alert", msg1);
      }
    });
  }, [db]);

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "red" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
        }}
        text2Style={{
          fontSize: 13,
        }}
      />
    ),
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Weather" component={Weather} />
          <Stack.Screen name="Controllers" component={Controllers} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
