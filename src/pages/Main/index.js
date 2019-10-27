import React, {useEffect, useState} from 'react';
import RNSoundLevel from 'react-native-sound-level';
import {Vibration} from 'react-native';

import {Container} from './styles';

export default function Atelibel() {
  const [rightDecibel] = useState(-30);
  const [decibel, setDecibel] = useState();
  const [vibrateDuration] = useState([1000, 2000, 3000]);

  useEffect(() => {
    RNSoundLevel.start();
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
  });

  return <Container color={decibel > rightDecibel ? 'red' : 'yellow'} />;
}
