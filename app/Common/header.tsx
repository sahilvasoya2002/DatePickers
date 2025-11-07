import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { IMAGES } from '../Assets/Images';

interface HeaderProps {
  title: string;
  onLogout?: () => void;
}

const CommonHeader = ({ title, onLogout }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {onLogout && (
        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <Image source={IMAGES.LOGOUT} style={{height:24 , width:24}} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FDF6EC',
    borderBottomWidth: 1,
    borderBottomColor: '#E0C9A6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3C2A21',
  },
  logoutBtn: {
    // backgroundColor: '#8B4513',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default CommonHeader;
