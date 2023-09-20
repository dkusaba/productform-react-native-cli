import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import store from './src/redux/store';
import MainNavigation from './src/navigation/MainNavigation';
import RootNavigation from './src/navigation/RootNavigation';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
