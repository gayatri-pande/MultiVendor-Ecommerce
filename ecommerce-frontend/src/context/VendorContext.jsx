import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const { token } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVendorStatus = async () => {
    try {
      const res = await api.get("/api/vendors/me");
      setVendor(res.data);
    } catch {
      setVendor(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  
    if (!token) {
      setVendor(null);
      setLoading(false);
      return;
    }

    setLoading(true); 
    fetchVendorStatus();
  }, [token]); 

  return (
    <VendorContext.Provider value={{ vendor, loading }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => useContext(VendorContext);
