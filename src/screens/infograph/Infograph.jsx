import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Profilelayout from '../../components/layout/Profilelayout';
import {useRoute} from '@react-navigation/native';

const Infograph = () => {
  const route = useRoute();
  const {uuid} = route.params;
  console.log('Infograph: ', uuid);
  return (
    <Profilelayout>
      <View>
        <Text>Infograph</Text>
      </View>
    </Profilelayout>
  );
};

const styles = StyleSheet.create({});

export default Infograph;
