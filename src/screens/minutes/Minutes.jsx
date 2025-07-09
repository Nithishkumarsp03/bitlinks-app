import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Profilelayout from '../../components/layout/Profilelayout';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faFilter} from '@fortawesome/free-solid-svg-icons';
import {useRoute} from '@react-navigation/native';
import {BASE_URL} from '@env';
import EncryptedStorage from 'react-native-encrypted-storage';
import MinuteCard from '../../components/minutes/Minutecard';

const Minutes = () => {
  const [loading, setLoading] = useState(false);
  const [minuteData, setMinuteData] = useState([]);
  const [minutetitle, setMinutetitle] = useState('');
  const route = useRoute();
  const {uuid, shaId} = route.params;

  const showToast = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      console.log(msg);
    }
  };

  const fetchMinutes = async () => {
    setLoading(true);
    try {
      const token = await EncryptedStorage.getItem('authToken');
      const res = await fetch(`${BASE_URL}/api/minutes/fetchminutes/uuid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({uuid: uuid, shaid: shaId}),
      });

      const data = await res.json();
      setMinuteData(data.minutes);
      setMinutetitle(data.title);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast(error.message || 'Failed to fetch minutes');
    }
  };

  useEffect(() => {
    fetchMinutes();
  }, [uuid, shaId]);

  return (
    <Profilelayout>
      <Text style={styles.pagetitle}>{minutetitle} - Minutes of Meeting</Text>

      <View style={styles.searchContainer}>
        <FontAwesomeIcon
          icon={faSearch}
          size={18}
          color="#666"
          style={styles.icon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Minutes"
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => console.log('Filter pressed')}>
          <FontAwesomeIcon icon={faFilter} size={18} color="black" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2867b2" />
        </View>
      ) : (
        <FlatList
          data={minuteData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <MinuteCard minute={item} />}
          contentContainerStyle={{paddingBottom: 100}}
          ListEmptyComponent={
            <Text style={styles.noResults}>No minutes found</Text>
          }
        />
      )}
    </Profilelayout>
  );
};

const styles = StyleSheet.create({
  pagetitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2867b2',
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: 'black',
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Minutes;
