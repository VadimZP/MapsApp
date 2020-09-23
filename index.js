import { Navigation } from 'react-native-navigation'

import registerScreens from './src/navigation/screens'

registerScreens();


Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'MAIN_BOTTOM_TABS',
        children: [
          {
            component: {
              id: 'Home',
              name: 'Home',
              options: {
                bottomTab: {
                  text: 'Home',
                  fontSize: 12,
                },
                topBar: {
                  visible: false
                }
              },
            },
          },
          {
            component: {
              id: 'Search',
              name: 'Search',
              passProps: {
                city: null,
              },
              options: {
                bottomTab: {
                  text: 'Search',
                  fontSize: 12,
                },
              },
            },
          },
        ],
      },
    },
  });
});
