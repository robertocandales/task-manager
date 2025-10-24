import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';
import {isApiAvailable} from '../config';
import {Theme} from '../utils/theme';

interface ApiStatusProps {
  theme: Theme;
}

const ApiStatus: React.FC<ApiStatusProps> = ({theme}) => {
  const [isApiOnline, setIsApiOnline] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkApiStatus = async () => {
      setIsChecking(true);
      const available = await isApiAvailable();
      setIsApiOnline(available);
      setIsChecking(false);
    };

    checkApiStatus();

    // Check API status every 30 seconds
    const interval = setInterval(checkApiStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isChecking) {
    return (
      <Chip
        icon="loading"
        style={[styles.chip, {backgroundColor: theme.colors.warning}]}
        textStyle={{color: theme.colors.surface}}
      >
        Checking API...
      </Chip>
    );
  }

  return (
    <Chip
      icon={isApiOnline ? 'cloud-check' : 'cloud-off'}
      style={[
        styles.chip,
        {
          backgroundColor: isApiOnline
            ? theme.colors.success
            : theme.colors.error
        }
      ]}
      textStyle={{color: theme.colors.surface}}
    >
      {isApiOnline ? 'API Online' : 'Offline Mode'}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    marginHorizontal: 16,
    marginVertical: 4
  }
});

export default ApiStatus;
