// App.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);

  // Create user + profile
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: user.email.split("@")[0], // default username
        bio: ""
      });

      setMessage("Signup successful! Profile created.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Login + fetch profile
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get profile
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
        setMessage("Login successful!");
      } else {
        setMessage("No profile found.");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shree RAM Login</Text>
      
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Login" onPress={login} />
      
      <Text style={{ marginTop: 10 }}>{message}</Text>

      {profile && (
        <View style={{ marginTop: 20, padding: 10, borderWidth: 1 }}>
          <Text>👤 Username: {profile.username}</Text>
          <Text>📧 Email: {profile.email}</Text>
          <Text>📝 Bio: {profile.bio}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 }
});
