import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

const TreeConnections = ({ data }) => {
  if (!data || !data.subConnections) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2867b2" />
      </View>
    );
  }

  const { mainPerson, subConnections } = data;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConnections = subConnections.filter(conn =>
    conn.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Main Person Card */}
      <View style={styles.mainCard}>
        <Image
          source={{ uri: `https://bitlinks.bitsathy.ac.in/bitlinks${mainPerson.profile}` }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{mainPerson.fullname}</Text>
        {mainPerson.address ? (
          <Text style={styles.address}>{mainPerson.address}</Text>
        ) : null}
      </View>

      {/* Connector */}
      <View style={styles.line} />

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Sub Connections"
        placeholderTextColor="#888"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      {/* SubConnections List inside ScrollView (Safe with virtualized-view) */}
      {filteredConnections.map(item => (
        <View key={item.uuid} style={styles.subCard}>
          <Image
            source={{ uri: `https://bitlinks.bitsathy.ac.in/bitlinks${item.profile}` }}
            style={styles.subImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.subName}>{item.fullname}</Text>
            <Text style={styles.subAddress}>{item.address}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f8fb',
  },
  mainCard: {
    alignItems: 'center',
    backgroundColor: '#e0f0ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2867b2',
  },
  address: {
    fontSize: 14,
    color: '#555',
  },
  line: {
    width: 2,
    height: 20,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  subCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
  },
  subImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  subName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subAddress: {
    fontSize: 13,
    color: '#777',
  },
});

export default TreeConnections;
