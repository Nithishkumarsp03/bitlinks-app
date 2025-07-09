import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import MainLayout from '../../components/layout/Mainlayout';
import EncryptedStorage from 'react-native-encrypted-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faFilter} from '@fortawesome/free-solid-svg-icons';
import Projectcard from '../../components/projects/Projectcard';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '@env';

const Project = () => {
  const [ProjectData, setProjectData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigation = useNavigation();

  const fetchProjects = async (pageNum = 1) => {
    const token = await EncryptedStorage.getItem('authToken');
    try {
      const res = await fetch(`${BASE_URL}/api/project/fetchalldata?page=${pageNum}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      const responseData = await res.json();

      if (Array.isArray(responseData.project)) {
        if (pageNum === 1) {
          setProjectData(responseData.project);
        } else {
          setProjectData(prev => [...prev, ...responseData.project]);
        }

        if (responseData.project.length < limit) {
          setHasMore(false); // no more data
        }
      } else {
        setHasMore(false);
      }

    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setInitialLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchProjects(1); // load first page
  }, []);

  const loadMore = () => {
    if (!isFetchingMore && hasMore) {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProjects(nextPage);
    }
  };

  return (
    <MainLayout>
      <Text style={styles.pagetext}>Projects</Text>
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
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => console.log('Filter pressed')}>
          <FontAwesomeIcon icon={faFilter} size={18} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.projectcontainer}>
        {initialLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#2867b2" />
          </View>
        ) : ProjectData.length > 0 ? (
          <FlatList
            data={ProjectData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Projectcard
                project={{
                  name: item.title,
                  status: item.status,
                  leader: item.project_leader,
                  progress: item.approved_percentage,
                  domain: item.domain,
                  startDate: item.initial_date,
                  endDate: item.due_date,
                  completedMinutes: item.approved_minutes,
                  totalMinutes: item.total_minutes,
                  uuid: item.uuid,
                  shaId: item.sha_id,
                }}
                navigation={navigation}
              />
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingMore ? (
                <View style={styles.footerLoader}>
                  <ActivityIndicator size="small" color="#2867b2" />
                </View>
              ) : null
            }
          />
        ) : (
          <Text style={styles.noResults}>No Projects found</Text>
        )}
      </View>
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
  projectcontainer: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default Project;
