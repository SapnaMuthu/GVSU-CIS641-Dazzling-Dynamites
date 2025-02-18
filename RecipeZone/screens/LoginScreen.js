import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormInput from '../components/FormInput'; 
import FormButton from '../components/FormButton';
import { auth } from '../fb-config/fb-credentials';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(()=>{
    const unsub =  auth.onAuthStateChanged(user=>{
        if(user){
          navigation.navigate("Recipe List");
        }
      })
  
      return unsub;
    },[])
  
  const signinHandler=()=>{
    auth.signInWithEmailAndPassword(email, password).then(userCredentials=>{
      const user=userCredentials.user;
      // console.log("Logged in with: ",user.email)
    }).catch(error=>alert(error.message))
  } 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/REZO.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Recipe Zone</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={signinHandler}
      />


      <TouchableOpacity
        style={styles.SignUpButton}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    color: '#051d5f',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 140
  },
  logo: {
    height: 150,
    width: 150,
    // alignItems: 'start',
    resizeMode: 'cover',
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#ffffff',
  },
  SignUpButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    // fontFamily: 'Lato-Regular',
  },
});