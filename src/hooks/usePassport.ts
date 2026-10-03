import { useState, useEffect } from 'react';
import { fetchMSMEProfile } from '../services/api';
import { MSMEProfile } from '../types';

export const usePassport = () => {
  const [profile, setProfile] = useState<MSMEProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchMSMEProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  return { profile, loading };
};
