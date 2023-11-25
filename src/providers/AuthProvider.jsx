import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../configs/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => null);
  const [isLoading, setIsLoading] = useState(() => true);

  const loginWithGoogle = () => {
    setIsLoading(() => true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setIsLoading(() => true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setIsLoading(() => true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profile) => {
    setIsLoading(() => true);
    return updateProfile(auth.currentUser, profile);
  };

  const logoutUser = () => {
    setIsLoading(() => true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(() => currentUser);
      setIsLoading(() => false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    isLoading,
    setIsLoading,
    loginWithGoogle,
    createUser,
    loginUser,
    updateUserProfile,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
