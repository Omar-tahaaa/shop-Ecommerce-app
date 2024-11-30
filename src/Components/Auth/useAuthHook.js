import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase.config";

function useAuth() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return {
    currentUser,
  };
}

export default useAuth;
