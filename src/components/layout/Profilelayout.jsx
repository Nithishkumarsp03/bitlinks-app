import React, {useState, useRef} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faLink,
  faChartBar,
  faClipboardList,
  faBell,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Popover from 'react-native-popover-view';
import Logo from '../../assets/bitlinks logo.svg';
import EncryptedStorage from 'react-native-encrypted-storage';

const Profilelayout = ({children}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { uuid } = route.params;
  const hasUnreadNotifications = true;

  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const profileRef = useRef(null);

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
            displayTriangle={true}
            popoverStyle={styles.popover}>
            <View style={styles.popoverContent}>
              <TouchableOpacity style={styles.popoverItem}>
                <FontAwesomeIcon icon={faUser} size={20} color="#2867b2" />
                <Text style={styles.popoverText}>John Doe</Text>
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
                    await EncryptedStorage.clear(); // Clear all stored user data
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'login'}], // Reset navigation stack and go to Login
                    });
                  } catch (error) {
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
          onPress={() => navigation.navigate('Profile', {uuid: uuid})}>
          <FontAwesomeIcon
            icon={faUser}
            size={20}
            color={route.name === 'Profile' ? '#2867b2' : 'black'}
          />
          <Text
            style={[
              styles.navText,
              route.name === 'Profile' && styles.activeText,
            ]}>
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Interlinks', {uuid: uuid})}>
          <FontAwesomeIcon
            icon={faLink}
            size={20}
            color={route.name === 'Interlinks' ? '#2867b2' : 'black'}
          />
          <Text
            style={[
              styles.navText,
              route.name === 'Interlinks' && styles.activeText,
            ]}>
            Interlinks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Infograph', {uuid: uuid})}>
          <FontAwesomeIcon
            icon={faChartBar}
            size={20}
            color={route.name === 'Infograph' ? '#2867b2' : 'black'}
          />
          <Text
            style={[
              styles.navText,
              route.name === 'Infograph' && styles.activeText,
            ]}>
            Infograph
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Mom', {uuid: uuid})}>
          <FontAwesomeIcon
            icon={faClipboardList}
            size={20}
            color={
              route.name === 'Mom' || route.name === 'Minutes'
                ? '#2867b2'
                : 'black'
            }
          />
          <Text
            style={[
              styles.navText,
              (route.name === 'Mom' || route.name === 'Minutes') &&
                styles.activeText,
            ]}>
            M.O.M
          </Text>
        </TouchableOpacity>
      </View>
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

export default Profilelayout;
