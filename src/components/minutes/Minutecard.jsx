import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MinuteCard = ({ minute }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.topic}>{minute.topic}</Text>
      <Text style={styles.description}>{minute.description}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Initial Date:</Text>
        <Text style={styles.value}>{minute.initial_date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Due Date:</Text>
        <Text style={styles.value}>{minute.due_date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Handler:</Text>
        <Text style={styles.value}>{minute.handler}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text
          style={[
            styles.status,
            {
              backgroundColor:
                minute.status === 'Approved' ? '#4CAF50' : minute.status === 'Pending' ? 'orange' : 'red',
            },
          ]}>
          {minute.status}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Created:</Text>
        <Text style={styles.value}>{minute.created_at.split('T')[0]}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Last Update:</Text>
        <Text style={styles.value}>{minute.updated_at.split('T')[0]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
  topic: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    color: '#555',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 120,
    color: '#555',
    fontWeight: 'bold',
  },
  value: {
    color: '#333',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    color: '#fff',
    overflow: 'hidden',
    fontWeight: 'bold',
  },
});

export default MinuteCard;
