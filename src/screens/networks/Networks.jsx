import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MainLayout from '../../components/layout/Mainlayout';
import Card from '../../components/connections/Card';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faFilter} from '@fortawesome/free-solid-svg-icons';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';
import { FlatList } from 'react-native';
import {BASE_URL, API_KEY} from '@env';

const Networks = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [persondata, setPersondata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredConnections, setFilteredConnections] = useState([
    'John Doe',
    'Alice John',
    'Mark Smith',
    'Jane Doe',
  ]);

  const allConnections = ['John Doe', 'Alice John', 'Mark Smith', 'Jane Doe'];

  // Function to handle search
  const handleSearch = text => {
    setSearchQuery(text);
    if (text) {
      const filtered = allConnections.filter(name =>
        name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredConnections(filtered);
    } else {
      setFilteredConnections(allConnections);
    }
  };

  const fetchNetworks = async () => {
    setLoading(true);
    const token = await EncryptedStorage.getItem('authToken');
    try {
      const res = await fetch(`${BASE_URL}/api/network/fetchdata`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      const responseData = await res.json();
      // console.log(responseData);
      if (Array.isArray(responseData.data)) {
        setPersondata(responseData.data);
      } else {
        setPersondata([]);
      }

      if (!res.ok) {
        setLoading(false);
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching person data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworks();
  }, []);

  return (
    <MainLayout>
      <Text style={styles.pagetext}>Networks</Text>
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
      {loading ? (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" color="#2867b2" />
  </View>
) : persondata.length > 0 ? (
  <FlatList
    data={persondata}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item}) => (
      <View style={styles.cardbox}>
        <Card
          name={item.fullname}
          navigation={navigation}
          role={item.role}
          email={item.email}
          linkedin={item.linkedinurl}
          call={item.phonenumber}
        />
      </View>
    )}
    initialNumToRender={20}
    maxToRenderPerBatch={20}
    windowSize={10}
    ListFooterComponent={<ActivityIndicator size="large" color="#2867b2" />} // optional spacer
  />
) : (
  <Text style={styles.noResults}>No Networks found</Text>
)}

    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  pagetext: {
    color: '#2867b2',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

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
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default Networks;
