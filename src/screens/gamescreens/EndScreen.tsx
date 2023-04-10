import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import gameContext from '@/common/hooks/gameContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EndScreen = () => {

  //DUETO: move stupid red button down, idk why thats not working

  const navigation = useNavigation();
  const { score, setScore, setEarnings, setRound } = useContext(gameContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false, //can be set to false to disable swipe out of page
      gestureDirection: 'horizontal',
    });
  }, [navigation]);

  function clearGame() { //wipes game stats so player can start again
    setScore(0);
    setEarnings(0);
    setRound(1);
  }

  return (
    <LinearGradient className="justify-center flex-1 items-center" start={{ x: -0.5, y: 0 }} colors={['#014871', '#A0EBCF']} style={{ flex: 1, justifyContent: 'flex-start' }}>
      <View className='justify-center items-center flex-1 p-10'>
        <Text className='font-semibold text-3xl text-white absolute top-16'>This is the End Screen. Your final score: {score}</Text>
        <TouchableOpacity className="bg-red-500 px-2 m-2 rounded-3x"
          onPress={() => { clearGame(); navigation.navigate("Start"); }}>
          <Text className="text-white text-xl px-8 py-2 text-1 font-semibold">Restart Game</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default EndScreen