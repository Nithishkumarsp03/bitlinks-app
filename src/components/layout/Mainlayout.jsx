import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserFriends,
  faNetworkWired,
  faUserTie,
  faTasks,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBell,
  faUser,
  faCog,
  faSignOutAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import EncryptedStorage from 'react-native-encrypted-storage';
import { ToastAndroid, Platform } from 'react-native';

import Popover from 'react-native-popover-view';
import Logo from '../../assets/bitlinks logo.svg';

const MainLayout = ({children}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const hasUnreadNotifications = true;

  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const profileRef = useRef(null);
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });

  const showToast = (msg) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    // Use third-party toast for iOS or universal support
    console.log(msg);
  }
};


  useEffect(() => {
    const loadUserData = async () => {
      try {
        const name = await EncryptedStorage.getItem('name');
        const email = await EncryptedStorage.getItem('email');
        const role = await EncryptedStorage.getItem('role');

        setUser({
          name: name || 'Guest',
          email: email || 'No email',
          role: role || 'User',
        });
      } catch (error) {
        showToast('Error fetching user data, Please Relogin');
        console.error('Error fetching user data:', error);
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Logo />

        {/* Right Section */}
        <View style={styles.headerRight}>
          {/* Notification Icon */}
          <TouchableOpacity style={styles.notificationWrapper}>
            <FontAwesomeIcon icon={faBell} size={25} color="#2867b2" />
            {hasUnreadNotifications && <View style={styles.notificationDot} />}
          </TouchableOpacity>

          {/* Profile Image with Popover */}
          <TouchableOpacity
            ref={profileRef}
            onPress={() => setPopoverVisible(true)}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS22Rp5GdcJ_hJld-mdizd8Gg0O7SycPtiG5g&s',
              }}
              style={styles.headerImage}
            />
          </TouchableOpacity>

          {/* Popover Menu */}
          <Popover
            isVisible={isPopoverVisible}
            from={profileRef}
            onRequestClose={() => setPopoverVisible(false)}
            // placement="bottom"
            displayTriangle={true} // Enables the small arrow pointing to the profile
            popoverStyle={styles.popover}>
            <View style={styles.popoverContent}>
              <TouchableOpacity style={styles.popoverItem}>
                <FontAwesomeIcon icon={faUser} size={20} color="#2867b2" />
                <Text style={styles.popoverText}>{user.name || 'Guest'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.popoverItem}>
                <FontAwesomeIcon icon={faEnvelope} size={20} color="#2867b2" />
                <Text style={styles.popoverText}>{user.email || 'Guest'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.popoverItem}
                onPress={() => navigation.navigate('Settings')}>
                <FontAwesomeIcon icon={faCog} size={20} color="#2867b2" />
                <Text style={styles.popoverText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.popoverItem}
                onPress={async () => {
                  try {
                    showToast('Logged out successfully!');
                    await EncryptedStorage.clear(); // Clear all stored user data
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'login'}], // Reset navigation stack and go to Login
                    });
                  } catch (error) {
                    showToast('Error clearing storage');
                    console.error('Error clearing storage:', error);
                  }
                }}>
                <FontAwesomeIcon icon={faSignOutAlt} size={20} color="red" />
                <Text style={[styles.popoverText, {color: 'red'}]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Popover>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>{children}</View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Myconnections')}>
          <FontAwesomeIcon
            icon={faUserFriends}
            size={20}
            color={route.name === 'Myconnections' ? '#2867b2' : 'black'}
          />
          <Text
            style={[
              styles.navText,
              route.name === 'Myconnections' && styles.activeText,
            ]}>
            Connections
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Networks')}>
          <FontAwesomeIcon
            icon={faNetworkWired}
            size={20}
            color={route.name === 'Networks' ? '#2867b2' : 'black'}
          />
          <Text
            style={[
              styles.navText,
              route.name === 'Networks' && styles.activeText,
            ]}>
            Networks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Spoc')}>
          <FontAwesomeIcon
            icon={faUserTie}
            size={20}
            color={route.name === 'Spoc' ? '#2867b2' : 'black'}
          />
          <Text
            style={[
              styles.navText,
              route.name === 'Spoc' && styles.activeText,
            ]}>
            Spoc
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Project')}>
          <FontAwesomeIcon
            icon={faTasks}
            size={20}
            color={route.name === 'Project' ? '#2867b2' : 'black'}
          />
          <Text
            style={[
              styles.navText,
              route.name === 'Project' && styles.activeText,
            ]}>
            Projects
          </Text>
        </TouchableOpacity>
      </View>

      {/* Floating Add Connection Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Addconnection')}>
        <FontAwesomeIcon icon={faUserPlus} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#edf3f7'},
  header: {
    backgroundColor: 'white',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationWrapper: {
    position: 'relative',
    marginRight: 15,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  headerImage: {width: 40, height: 40, borderRadius: 50},
  content: {flex: 1, padding: 10},
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  navItem: {
    width: 'auto',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  navText: {
    color: 'black',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#2867b2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  activeText: {
    color: '#2867b2',
    fontWeight: 'bold',
  },
  popover: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
  },
  popoverContent: {
    paddingVertical: 5,
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  popoverText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
});

export default MainLayout;
