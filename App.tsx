// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import AppNavigator from './src/navigations/AppNavigator';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.text}>Hello, React Native CLI! 🚀</Text> */}
//       <AppNavigator />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default App;


import React from 'react';
import AppNavigator from './src/navigations/AppNavigator';

const App = () => {
  return <AppNavigator />;
};

export default App;
