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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faFilter} from '@fortawesome/free-solid-svg-icons';
import MainLayout from '../../components/layout/Mainlayout';
import Card from '../../components/connections/Card';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {BASE_URL, API_KEY} from '@env';

export const Myconnections = () => {
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

  const fetchConnections = async () => {
    setLoading(true);
    const email = await EncryptedStorage.getItem('email');
    const token = await EncryptedStorage.getItem('authToken');
    try {
      const res = await fetch(`${BASE_URL}/api/person/fetchdata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({email: email}),
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
      // console.error('Error fetching person data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

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

  return (
    <MainLayout>
      <Text style={styles.pagetext}>Connections</Text>

      {/* Search Bar with Filter Icon */}
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

      {/* Connections List */}
      <ScrollView showsVerticalScrollIndicator={true}>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#2867b2" />
          </View>
        ) : persondata.length > 0 ? (
          persondata.map((key, index) => (
            <View style={styles.cardbox} key={index}>
              <Card
                name={key.fullname}
                navigation={navigation}
                role={key.role}
                email={key.email}
                linkedin={key.linkedinurl}
                call={key.phonenumber}
              />
            </View>
          ))
        ) : (
          <Text style={styles.noResults}>No Connections found</Text>
        )}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
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

export default Myconnections;
