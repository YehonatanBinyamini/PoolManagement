import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { selectTranslations } from "./redux/i18n";
//import { Ionicons, MaterialIcons } from "@expo/vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import StringsComponent from "./components/strings";

//components:
import Home from "./screens/Home";
import AddStudent from "./screens/AddStudent";
import GanttChart from "./screens/MyGanttChart";
import Login from "./screens/Login";
import Conflicts from "./screens/Conflicts";
import { useState } from "react";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#003e7f" },
        headerTintColor: "white",
        tabBarActiveTintColor: "#003e7f",
        tabBarLabel:() => {return null},
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'
            //to change icon when focus on the other:
            // focused
            //   ? 'ios-home'
            //   : 'person';
          } else if (route.name === 'AddStudent') {
            iconName = 'person'
            //to change icon when focus on the other:
            //focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#003e7f',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <BottomTab.Screen
        name="AddStudent"
        component={AddStudent}
        options={{
          //title: "הוספת תלמיד",
          
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          //title: "מסך הבית",
        }}
      />
    </BottomTab.Navigator>
  );
}
export default function App() {
  //const strings = useSelector(selectTranslations);
  let s;
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#003e7f" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#b2e7e8" },
            }}
          >
            <Stack.Screen
              name="TabsNav"
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  title: "התחברות",
                }}
              />
            {/* <Stack.Screen
              name="Test"
              component={Test}
              options={{
                title: "טסט",
              }}
            /> */}
            <Stack.Screen
              name="GanttChart"
              component={GanttChart}
              options={{
                title: "תרשים גאנט",
                headerBackTitle: "מסך הבית"
              }}
            />
            <Stack.Screen
              name="Conflicts"
              component={Conflicts}
              options={{
                title: "קונפליקטים",
                headerBackTitle: "מסך הבית",
              }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
