import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import MainLayout from '../../components/layout/Mainlayout';
import Card from '../../components/connections/Card';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import {useNavigation, useRoute} from '@react-navigation/native';

const Spoc = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
    const [filteredConnections, setFilteredConnections] = useState([
      'John Doe',
      'Alice John',
      'Mark Smith',
      'Jane Doe',
    ]);

    const allConnections = ['John Doe', 'Alice John', 'Mark Smith', 'Jane Doe'];

    // Function to handle search
    const handleSearch = (text) => {
      setSearchQuery(text);
      if (text) {
        const filtered = allConnections.filter((name) =>
          name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredConnections(filtered);
      } else {
        setFilteredConnections(allConnections);
      }
    };
  return (
    <MainLayout>
      <Text style={styles.pagetext}>Spoc</Text>
      <View style={styles.searchContainer}>
        <FontAwesomeIcon
          icon={faSearch}
          size={18}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Connections"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => console.log('Filter pressed')}>
          <FontAwesomeIcon icon={faFilter} size={18} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.cardbox}>
          <Card name={'John Doe'} navigation={navigation}/>
        </View>
        <View style={styles.cardbox}>
          <Card name={'Alice john'} navigation={navigation}/>
        </View>
        <View style={styles.cardbox}>
          <Card name={'Mark Smith'} navigation={navigation}/>
        </View>
        <View style={styles.cardbox}>
          <Card name={'Jane Doe'} navigation={navigation}/>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  pagetext: { color: '#2867b2', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  filterButton: {
    padding: 8,
  },
  cardbox: {
    backgroundColor: 'white',
    height: 80,
    marginTop: 5,
    borderRadius: 10,
  },
});

export default Spoc;
