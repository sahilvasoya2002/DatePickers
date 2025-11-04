import React, { useState, useEffect } from 'react';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useColorScheme,
  Alert
} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <BombGame />
    </SafeAreaProvider>
  );
}

function BombGame() {
  const [num, setNum] = useState('');
  const [gridSize, setGridSize] = useState(0);
  const [bombs, setBombs] = useState<number[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const generateGrid = () => {
    const n = Number(num);
    if (!n || n < 2) {
      Alert.alert('Enter minimum 2');
      return;
    }

    setGridSize(n);

    let totalBoxes = n * n;
    // Generate random bombs (20% bombs)
    let bombCount = Math.floor(totalBoxes * 0.2);

    let generated: number[] = [];
    while (generated.length < bombCount) {
      let rand = Math.floor(Math.random() * totalBoxes);
      if (!generated.includes(rand)) generated.push(rand);
    }
console.log(generated)
    setBombs(generated);
    setRevealed([]);
    setGameOver(false);
  };

  const onPressBox = (index: number) => {
    if (gameOver) return;

    if (bombs.includes(index)) {
      setGameOver(true);
      Alert.alert('💥 Game Over!', 'You tapped on a bomb!');
      setRevealed([...revealed, index]);
      return;
    }
    setRevealed([...revealed, index]);
  };

  const renderBox = (index: number) => {
    const isBomb = bombs.includes(index);
    const isOpen = revealed.includes(index);

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.box,
          { backgroundColor: isOpen ? '#ddd' : '#aaa' }
        ]}
        onPress={() => onPressBox(index)}
      >
        {isOpen && (
          <Text style={{ fontSize: 20 }}>
            {isBomb ? '💣' : '✅'}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bomb Game</Text>

      <TextInput
        placeholder="Enter number"
        value={num}
        onChangeText={setNum}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={generateGrid}>
        <Text style={{ color: '#fff' }}>Create Grid</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: gridSize * 60,
          marginTop: 20,
          justifyContent: 'center'
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => renderBox(i))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', marginTop: 50 },
  title: { fontSize: 28, fontWeight: '600', marginBottom: 10 },
  input: {
    borderWidth: 1,
    width: 200,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10
  },
  btn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  box: {
    width: 55,
    height: 55,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  }
});

export default App;
