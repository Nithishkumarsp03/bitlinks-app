import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import Call from '../../assets/card/Phone.svg';
import Mail from '../../assets/card/Gmail.svg';
import Linkedin from '../../assets/card/devicon_linkedin.svg';
import Arrow from '../../assets/card/arrow.svg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
// import Carousel from '../../assets/card/view_carousel.svg';

const Card = ({name, navigation, email, call, linkedin, role, uuid}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile', {uuid: uuid})}>
      <View style={styles.cardcontainer}>
        <FontAwesomeIcon
          icon={faPlus}
          size={10}
          color="#ffffff"
          style={styles.plusIcon}
        />

        <View
          style={{
            width: 55,
            justifyContent: 'center',
            alignItems: 'start',
            gap: 0,
          }}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS22Rp5GdcJ_hJld-mdizd8Gg0O7SycPtiG5g&s',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name || 'John Doe'}
            </Text>
            <Text style={styles.role} numberOfLines={1} ellipsizeMode="tail">
              {role || '---'}
            </Text>
            <View style={{flexDirection: 'row', gap: 15}}>
              <Call width={14} />
              <Mail width={14} />
              <Linkedin width={14} />
            </View>
          </View>

          <View>
            <Arrow width={20} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardcontainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 0,
  },
  plusIcon: {
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1,
  backgroundColor: '#2867b2',
  borderRadius: 10,
  padding: 8,
},
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  details: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 2,
    width: 'full',
  },
  role: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'heavy',
    marginBottom: 2,
  },
  connections: {
    color: '#2867b2',
  },
});

export default Card;
