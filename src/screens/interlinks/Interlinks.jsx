import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Profilelayout from '../../components/layout/Profilelayout';
import TreeConnections from '../../components/profile/Treeconnections';
import {useRoute} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {BASE_URL} from '@env';

const Interlinks = () => {
  const route = useRoute();
  const {uuid} = route.params;
  const [response, setResponse] = useState({});
//   console.log('Interlinks: ', uuid);
    const fetchConnection = async () => {
      const token = await EncryptedStorage.getItem('authToken');
      try {
        const res = await fetch(`${BASE_URL}/api/person/fetchpersonconnections`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({uuid}),
        });
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
        fetchConnection();
    });

  return (
    <Profilelayout>
      <TreeConnections data={response} />
    </Profilelayout>
  );
};

const styles = StyleSheet.create({});

export default Interlinks;
