import React, {useEffect, useState} from 'react';
import RNSoundLevel from 'react-native-sound-level';
import {View, Text, Vibration} from 'react-native';

// import { Container } from './styles';

export default function Atelibel() {
  const [decibelPeace] = useState(-30);
  const [decibel, setDecibel] = useState('');
  useEffect(() => {
    RNSoundLevel.start();
    RNSoundLevel.onNewFrame = data => {
      setDecibel(data.value);
    };
    return () => {
      RNSoundLevel.stop();
    };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: decibel > decibelPeace ? 'red' : 'yellow',
      }}>
      {decibel > decibelPeace && (
        <Text style={{fontSize: 32, color: 'white', fontWeight: 'bold'}}>
          Danger!
        </Text>
      )}
    </View>
  );
}
