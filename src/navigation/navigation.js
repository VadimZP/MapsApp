import { Navigation } from 'react-native-navigation'

export const goToSearch = (propComponentId, propsToPass) => Navigation.mergeOptions('MAIN_BOTTOM_TABS', {
  bottomTabs: {
    currentTabIndex: 1,
  }
});
