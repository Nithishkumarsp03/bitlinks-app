import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Profilelayout from '../../components/layout/Profilelayout';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faFilter} from '@fortawesome/free-solid-svg-icons';
import Projectcard from '../../components/projects/Projectcard';
import {useNavigation} from '@react-navigation/native';

const Mom = () => {
  const navigation = useNavigation();
  return (
    <Profilelayout>
      <Text style={styles.pagetext}>M.O.M</Text>
      <View style={styles.searchContainer}>
        <FontAwesomeIcon
          icon={faSearch}
          size={18}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Projects"
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => console.log('Filter pressed')}>
          <FontAwesomeIcon icon={faFilter} size={18} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.projectcontainer}>
        <Projectcard
          project={{
            name: 'AI Startup',
            status: 'Completed',
            leader: 'John Doe',
            progress: 100,
            domain: 'Artificial Intelligence',
            startDate: '2024-01-10',
            endDate: '2024-06-15',
            completedMinutes: 450,
            totalMinutes: 900,
          }}
          navigation={navigation}
        />
      </View>
    </Profilelayout>
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
  projectcontainer: {
    flex: 1,
  },
});

export default Mom;
