import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../Common/header';
import InputField from '../../Common/Input';
import { COLORS } from '../../Common/colors';
import CommonModal from '../../Common/modal';

const BombGame = ({ navigation }: any) => {
  const [gridInput, setGridInput] = useState('');
  const [gridSize, setGridSize] = useState(0);
  const [bombs, setBombs] = useState<number[]>([]);
  const [opened, setOpened] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleCreateGrid = useCallback(() => {
    setError('');
    const n = parseInt(gridInput, 10);

    if (!n || n < 2) {
      setError('Please enter a number greater than or equal to 2');
      return;
    }

    const totalCells = n * n;
    const bombCount = Math.floor(totalCells * 0.2);
    const randomBombs: number[] = [];

    while (randomBombs.length < bombCount) {
      const rand = Math.floor(Math.random() * totalCells);
      if (!randomBombs.includes(rand)) randomBombs.push(rand);
    }

    setGridSize(n);
    setBombs(randomBombs);
    setOpened([]);
    setIsGameOver(false);
    setDisabled(false);
  }, [gridInput]);

  const handleBoxPress = useCallback(
    (index: number) => {
      if (isGameOver || opened.includes(index) || disabled) return;

      const isBomb = bombs.includes(index);

      if (isBomb) {
        setOpened((prev) => [...prev, index]);
        setIsGameOver(true);
        setDisabled(true);
        Alert.alert('💥 Boom!', 'You hit a bomb. Game Over!');
      } else {
        setOpened((prev) => [...prev, index]);
      }
    },
    [bombs, opened, isGameOver, disabled]
  );

  const handleRestart = useCallback(() => {
    setGridInput('');
    setGridSize(0);
    setBombs([]);
    setOpened([]);
    setIsGameOver(false);
    setDisabled(false);
  }, []);

  const handleLogout = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const confirmLogout = useCallback(() => {
    setShowLogoutModal(false);
    navigation.replace('Login');
  }, [navigation]);

  const renderBox = (index: number) => {
    const isBomb = bombs.includes(index);
    const isOpen = opened.includes(index);

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.box,
          {
            backgroundColor: isOpen
              ? isBomb
                ? '#F87171'
                : '#A7F3D0'
              : COLORS.card,
            borderColor: COLORS.border,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
        onPress={() => handleBoxPress(index)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {isOpen && (
          <Text style={styles.boxText}>{isBomb ? '💣' : '✅'}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="💣 Bomb Game" onLogout={handleLogout} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Avoid the Bombs!</Text>

        <InputField
          placeholder="Enter grid size (min 2)"
          value={gridInput}
          onChangeText={(text: string) => {
            setGridInput(text);
            if (error) setError('');
          }}
          keyboardType="numeric"
          containerStyle={[
            styles.inputWrapper,
            error ? styles.errorBorder : {},
          ]}
          inputStyle={styles.input}
          editable={!disabled}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.btn, disabled && { opacity: 0.6 }]}
          onPress={handleCreateGrid}
          disabled={disabled}
        >
          <Text style={styles.btnText}>Create Grid</Text>
        </TouchableOpacity>

        <View
          style={[
            styles.grid,
            { width: gridSize ? gridSize * 56 : 0 },
          ]}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, i) =>
            renderBox(i)
          )}
        </View>

        {isGameOver && (
          <View style={styles.retrySection}>
            <Text style={styles.lostText}>💀 You lost! Try again.</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={handleRestart}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <CommonModal
        visible={showLogoutModal}
        title="Logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

    </SafeAreaView>
  );
};

export default BombGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 25,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    width: 200,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  input: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 16,
  },
  errorBorder: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 25,
    alignSelf: 'center',
  },
  box: {
    width: 50,
    height: 50,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  boxText: {
    fontSize: 20,
  },
  retrySection: {
    alignItems: 'center',
    marginTop: 20,
  },
  lostText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B91C1C',
    marginBottom: 10,
  },
  retryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
