import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {

    async function fetchUserProfile() {
      try {
        const response = await axios.get(`${SERVER_URL}/profile`, {
          withCredentials: true,
        });
        const data = response.data;
        console.log(data);
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.log('Error fetching profile:', error);
      } finally {
        setLoading(false); // Loading complete
      }
    }

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ isAuthenticated, user, setUser, setIsAuthenticated, loading }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;


