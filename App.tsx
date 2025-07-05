import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import RNFS from 'react-native-fs';
import RNRestart from 'react-native-restart';
import {View, Text, ActivityIndicator} from 'react-native';

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const downloadBundle = async () => {
      const url = 'https://bitlinks.bitsathy.ac.in/app/index.android.bundle';
      const path = `${RNFS.DocumentDirectoryPath}/index.android.bundle`;
      console.log('[OTA] URL:', url);
      console.log('[OTA] Destination Path:', path);

      try {
        const exists = await RNFS.exists(path);

        if (!exists) {
          console.log('📥 Downloading OTA bundle...');
          const result = await RNFS.downloadFile({
            fromUrl: url,
            toFile: path,
          }).promise;

          if (result.statusCode === 200) {
            console.log('✅ OTA bundle downloaded. Restarting...');
            RNRestart.Restart(); // 🔁 This will restart and use the new bundle
          } else {
            console.warn('⚠️ Bundle download failed:', result.statusCode);
            setReady(true);
          }
        } else {
          console.log('📦 Bundle already exists.');
          setReady(true);
        }
      } catch (err) {
        console.error('❌ Error downloading bundle:', err);
        setReady(true);
      }
    };

    downloadBundle();
  }, []);

  if (!ready) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
        <Text>Loading OTA...</Text>
      </View>
    );
  }

  return <AppNavigator />;
};

export default App;
