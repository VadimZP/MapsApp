export const goToHome = () => Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    id: 'Home',
                    name: 'Home',
                    options: {
                      bottomTab: {
                        text: 'Home',
                        fontSize: 12,
                        icon: homeIcon,
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            component: {
              name: 'Search',
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: 'Search',
                  icon: searchIcon,
                },
              },
            },
          },
        ],
      },
    },
  });
  