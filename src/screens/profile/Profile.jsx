import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Profilelayout from '../../components/layout/Profilelayout';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Alert} from 'react-native';
import {
  faUserTie,
  faMapMarkerAlt,
  faCalendar,
  faLaptopCode,
  faBuilding,
  faEnvelope,
  faPhone,
  faGlobe,
  faLink,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useRoute} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {BASE_URL} from '@env';

const Profile = () => {
  const route = useRoute();
  const {uuid} = route.params;
  // console.log("Profile: ",uuid);
  const [personData, setPersondata] = useState(null);

  const fetchPersondata = async () => {
    const token = await EncryptedStorage.getItem('authToken');
    try {
      const res = await fetch(`${BASE_URL}/api/person/fetchpersondata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({uuid}),
      });
      const data = await res.json();
      setPersondata(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPersondata();
  }, [uuid]);

  if (!personData) {
  return (
    <Profilelayout>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2867b2" />
      </View>
    </Profilelayout>
  );
}

  const openLink = url => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  const handleRedirect = link => {
    Alert.alert(
      'Redirect Notice',
      'You are about to open the company website in your browser. Do you want to continue?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Continue', onPress: () => openLink(link)},
      ],
      {cancelable: true},
    );
  };

  return (
    <Profilelayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{uri: `${BASE_URL}${personData.profile}`}}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{personData.fullname}</Text>
            <Text style={styles.role}>{personData.role || '---'}</Text>
            <View style={styles.locationRow}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size={14}
                color="#2867B2"
              />
              <Text style={styles.location}>{personData.address || '---'}</Text>
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Short Description</Text>
          <Text style={styles.text}>{personData.shortdescription || '---'}</Text>
        </View>

        {/* Basic Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faUser} size={14} color="#2867B2" />
            <Text style={styles.infoText}>Age: {personData.age || '---'}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faCalendar} size={14} color="#2867B2" />
            <Text style={styles.infoText}>DOB: {personData.dob || '---'}</Text>
          </View>
        </View>

        {/* Professional Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Professional Information</Text>
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faLaptopCode} size={14} color="#2867B2" />
            <Text style={styles.infoText}>Domain: {personData.domain || '---'}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faLaptopCode} size={14} color="#2867B2" />
            <Text style={styles.infoText}>
              Skills: {personData.skillset || '---'}
            </Text>
          </View>
        </View>

        {/* Company Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Company</Text>

          {/* Company Name and Role */}
          <View style={styles.infoRowAligned}>
            <FontAwesomeIcon
              icon={faBuilding}
              size={16}
              color="#2867B2"
              style={styles.icon}
            />
            <View style={styles.infoBlock}>
              <Text style={styles.label}>Company:</Text>
              <Text style={styles.value}>{personData.companyname || '---'}</Text>
            </View>
          </View>

          <View style={styles.infoRowAligned}>
            <FontAwesomeIcon
              icon={faUserTie}
              size={16}
              color="#2867B2"
              style={styles.icon}
            />
            <View style={styles.infoBlock}>
              <Text style={styles.label}>Role:</Text>
              <Text style={styles.value}>{personData.role || '---'}</Text>
            </View>
          </View>

          {/* Experience */}
          <View style={styles.infoRowAligned}>
            <FontAwesomeIcon
              icon={faCalendar}
              size={16}
              color="#2867B2"
              style={styles.icon}
            />
            <View style={styles.infoBlock}>
              <Text style={styles.label}>Experience:</Text>
              <Text style={styles.value}>{personData.experience || '---'}</Text>
            </View>
          </View>

          {/* Address */}
          <View style={styles.infoRowAligned}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              size={16}
              color="#2867B2"
              style={styles.icon}
            />
            <View style={styles.infoBlock}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{personData.companyaddress || '---'}</Text>
            </View>
          </View>

          {/* Website */}
          <TouchableOpacity
            onPress={() => handleRedirect(personData.websiteurl)}>
            <View style={styles.infoRowAligned}>
              <FontAwesomeIcon
                icon={faGlobe}
                size={16}
                color="#2867B2"
                style={styles.icon}
              />
              <View style={styles.infoBlock}>
                <Text style={styles.label}>Website:</Text>
                <Text style={[styles.value, styles.linkText]}>
                  Visit Company Website
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faPhone} size={14} color="#2867B2" />
            <Text style={styles.infoText}>{personData.phonenumber || '---'}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faEnvelope} size={14} color="#2867B2" />
            <Text style={styles.infoText}>{personData.email || '---'}</Text>
          </View>
          <Text style={styles.infoRow}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size={14} color="#2867B2" />
            <Text style={styles.infoText}> {personData.address || '---'}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => handleRedirect(personData.linkedinurl)}>
            <View style={styles.infoRow}>
              <FontAwesomeIcon icon={faLink} size={14} color="#2867B2" />
              <Text style={[styles.infoText, styles.linkText]}>
                {personData.linkedinurl || '---'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Profilelayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2867B2',
  },
  role: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 6,
    color: '#666',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  linkText: {
    color: '#2867B2',
  },
  infoRowAligned: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    marginTop: 2,
  },
  infoBlock: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: '#666',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: '#333',
    flexWrap: 'wrap',
  },
});

export default Profile;
