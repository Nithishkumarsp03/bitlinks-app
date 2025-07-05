import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Projectcard = ({project, navigation}) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; // Animation control

  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 300, // Smooth transition (300ms)
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust height based on content
  });

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Minutes')} // Navigate when tapped
      activeOpacity={0.8}>
      <View style={styles.card}>
        {/* Compact View */}
        <View style={styles.row}>
          <View style={styles.info}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text
                style={[
                  styles.status,
                  project.status === 'Pending'
                    ? styles.pending
                    : styles.completed,
                ]}>
                {project.status}
              </Text>
            </View>

            {/* Leader with User Icon */}
            <View style={styles.leaderContainer}>
              <FontAwesomeIcon icon={faUser} size={14} color="#2867b2" />
              <Text style={styles.text}> {project.leader}</Text>
            </View>

            {/* Custom Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    {width: `${project.progress}%`}, // Dynamically set width
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{project.progress}%</Text>
            </View>
          </View>

          {/* Expand/Collapse Button */}
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <FontAwesomeIcon
              icon={expanded ? faChevronUp : faChevronDown}
              size={18}
              color="#2867b2"
            />
          </TouchableOpacity>
        </View>

        {/* Animated Expanded View */}
        <Animated.View style={[styles.details, {maxHeight}]}>
          <Text style={styles.text}>Domain: {project.domain}</Text>
          <Text style={styles.text}>Start Date: {project.startDate}</Text>
          <Text style={styles.text}>End Date: {project.endDate}</Text>
          <Text style={styles.text}>
            Minutes Completed: {project.completedMinutes}/{project.totalMinutes}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    padding: 0,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  pending: {
    backgroundColor: '#ed8f03',
    color: 'white',
  },
  completed: {
    backgroundColor: 'green',
    color: 'white',
  },
  leaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    width: '100%',
  },
  progressBarBackground: {
    width: '85%',
    height: 8,
    borderRadius: 5,
    backgroundColor: '#ddd',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2867b2',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: 'bold',
    color: '#2867b2',
  },
  details: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    overflow: 'hidden', // Ensures smooth collapse
  },
});

export default Projectcard;
