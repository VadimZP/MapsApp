// import { Navigation } from "react-native-navigation";
// import {AppRegistry} from 'react-native';

// import App from "./App";
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


// Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
// Navigation.events().registerAppLaunchedListener(() => {
//    Navigation.setRoot({
//      root: {
//        stack: {
//          children: [
//            {
//              component: {
//                name: 'com.myApp.WelcomeScreen'
//              }
//            }
//          ]
//        }
//      }
//   });
// });


// import { AppRegistry } from 'react-native'
import { Navigation } from 'react-native-navigation'

import registerScreens from './src/navigation/screens'
// import App from './App'
// import {name as appName} from './app.json'


// AppRegistry.registerComponent(appName, () => App);

registerScreens();


// Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Home'
              }
            }
          ]
        }
      }
    });
  });
// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setDefaultOptions({
//     bottomTabs: {
//       titleDisplayMode: 'alwaysShow',
//     },
//   });

//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               id: 'Home',
//               name: 'Home',
//             },
//           },
//         ],
//       },
//     },
//   });
// });

