import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {QueryClientProvider} from './scr/tanStackQuerry';
import {API_METHOD, serviceHandler} from './scr/api/serviceHandler';

function App(): React.JSX.Element {
  useEffect(() => {
    console.log('fetchTodo');

    const fetchTodo = async () => {
      const response = await serviceHandler(API_METHOD.GET, '/todos');
      console.log('response', response);
    };
    fetchTodo();
  }, []);
  return (
    <QueryClientProvider>
      <SafeAreaView></SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
