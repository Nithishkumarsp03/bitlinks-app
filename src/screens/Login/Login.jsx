import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BASE_URL, API_KEY} from '@env';
import EncryptedStorage from 'react-native-encrypted-storage';

const Logo = require('../../assets/bitlinks-bg.png');
const GoogleLogo = require('../../assets/google.png');

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log('BASE_URL:', BASE_URL); // Debugging

  const handleLogin = async () => {
    console.log('BASE_URL:', BASE_URL); // Debugging

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      console.log('Response Data:', data); // Debugging API response

      if (!res.ok) {
        console.log('Login failed', data);
        return;
      }

      await EncryptedStorage.setItem('authToken', data.token);
      await EncryptedStorage.setItem('name', data.userData.name);
      await EncryptedStorage.setItem('email', data.userData.email);
      await EncryptedStorage.setItem('role', data.userData.role);
      console.log('Login successful, navigating...');
      navigation.replace('Myconnections');
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Header */}
      <View style={styles.header} />

      {/* Logo */}
      <Image source={Logo} style={styles.logo} />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to BITLinks</Text>
      <Text style={styles.subText}>Connect the peoples</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        //  onPress={() => navigation.navigate("Myconnections")}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Google Sign-In */}
      <TouchableOpacity style={styles.googleButton}>
        <Image source={GoogleLogo} style={styles.googleIcon} />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Don't have an account? <Text style={styles.signupText}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: '#2867b2',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2867b2',
    textAlign: 'center',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: '#2867b2',
    paddingVertical: 12,
    width: '90%',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    width: '90%',
    borderRadius: 30,
    justifyContent: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  googleText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    color: '#666',
    fontSize: 14,
  },
  signupText: {
    color: '#2867b2',
    fontWeight: 'bold',
  },
});

export default Login;
