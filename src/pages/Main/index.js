import React, {useEffect, useState} from 'react';
import RNSoundLevel from 'react-native-sound-level';
import {Vibration, PermissionsAndroid} from 'react-native';

import {Container, TextDecibel} from './styles';

export default function Atelibel() {
  const [rightDecibel] = useState(-30);
  const [decibel, setDecibel] = useState();
  const [vibrateDuration] = useState([1000, 2000, 3000]);

  async function requestAudioRecordPermission() {
    try {
      if (
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
      ) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Audio Record Permission',
            message: 'App needs access to your microphone',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          RNSoundLevel.start();
        } else {
          console.log('Audio record permission denied');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    requestAudioRecordPermission();
    RNSoundLevel.onNewFrame = data => {
      setDecibel(data.value);
    };

    if (decibel > rightDecibel) {
      Vibration.vibrate(vibrateDuration);
    } else {
      Vibration.cancel();
    }
    return () => {
      RNSoundLevel.stop();
    };
  }, []);

  return (
    <Container>
      <TextDecibel color={decibel > rightDecibel ? 'red' : 'black'}>
        {decibel}
      </TextDecibel>
    </Container>
  );
}
