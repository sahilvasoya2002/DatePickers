import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';
import { Platform } from 'react-native';

export const loginUser = async (email: string, password: string) => {
  const response = await apiClient(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'App-Track-Version': 'v1',
      'App-Device-Type': Platform.OS === 'ios' ? 'iOS' : 'Android',
      'App-Store-Version': '1.1',
      'App-Device-Model': 'ReactNativeDevice',
      'App-Os-Version': Platform.Version.toString(),
      'App-Store-Build-Number': '1.1',
      'App-Secret': 'TESTRAVI@2204#$',
    },
    body: JSON.stringify({ email, password }),
  });

  return response;
};
