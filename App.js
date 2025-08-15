// App.js
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import app from "./firebase"; // 👈 our Firebase connection
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setMessage(`Signed up: ${userCredential.user.email}`);
      })
      .catch(error => {
        setMessage(error.message);
      });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setMessage(`Logged in: ${userCredential.user.email}`);
      })
      .catch(error => {
        setMessage(error.message);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10 }} value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10 }} secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Login" onPress={login} />
      <Text style={{ marginTop: 10 }}>{message}</Text>
    </View>
  );
    }
