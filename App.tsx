import React from 'react';
import {SafeAreaView} from 'react-native';
import {QueryClientProvider} from './scr/tanStackQuerry';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider>
      <SafeAreaView></SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
