import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList
} from 'react-native';
import {Keyboard} from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import * as Types from '../../store/module/types';

const {height} = Dimensions.get('window');

const START_POSITION = height/2-140;

const fetchData = async (searchValue) => {
  const search = searchValue !== undefined && searchValue !== null ? searchValue : '';
  try{
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`,{
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    const responseJson = await res.json();

    return responseJson;
  }catch(e){
    console.log(e.message);
    return null;
  }
}

const Main = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.cocktails);

  const [searchValue, setSearchValue] = useState('');

  const inputOffset = useSharedValue(START_POSITION);
  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(inputOffset.value) }],
    };
  });

  const logoOpacity = useSharedValue(1);
  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(logoOpacity.value),
      height: withTiming(interpolate(logoOpacity.value, [0, 1], [0, 200])),
    };
  });

  const listOffset = useSharedValue(height);
  const listAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(listOffset.value)}],
    };
  });

  useEffect(()=>{
    const timeOutId = setTimeout(async() => {
      const res = await fetchData(searchValue);
      dispatch({type: Types.SET_COCKTAILS, payload: res.drinks});
    }, 100);
    return () => clearTimeout(timeOutId);
  }, [searchValue]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#c71494', '#e43f2f']}
        useAngle
        angle={225}
        angleCenter={{x: 0.5, y: 0.5}}
        style={styles.gradient}
      >
        
        <Animated.View style={[styles.mainView,inputAnimatedStyle]}>
          <Animated.View
            style={[styles.logoView,logoAnimatedStyle]}
          >
            <Image 
              source={require('../../src/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          <View style={styles.inputView}>
            <TouchableOpacity
              style={styles.inputButtton}
              onPress={async () => {
                inputOffset.value = START_POSITION;
                logoOpacity.value = 1;
                listOffset.value = height;
                Keyboard.dismiss();
              }}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <TextInput 
              style={styles.input}
              placeholder="Search your favorite cocktail"
              placeholderTextColor='#888888'
              onChangeText={(text) => setSearchValue(text)}
              onFocus={() => {
                inputOffset.value = 0;
                logoOpacity.value = 0;
                listOffset.value = 70;
              }}
          />   
          </View> 
        </Animated.View>

        <Animated.View style={[styles.listView, listAnimatedStyle]}>
          {
              cocktails !== null && cocktails !== undefined && cocktails.length > 0 ?
              <FlatList
                style={styles.list}
                contentContainerStyle={{padding: 10}}
                data={cocktails}
                keyExtractor={(item) => item.idDrink}
                ItemSeparatorComponent={() => (
                  <View style={{height: 15}}/>
                )}
                renderItem={({item, index}) => {
                  return(
                    <TouchableOpacity
                      style={styles.itemView}
                    >
                      <Image 
                        source={{uri: item.strDrinkThumb}}
                        style={styles.itemImage}
                        resizeMode="cover"
                      />
                      <Text
                        style={styles.itemText}
                      >{item.strDrink}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            :
              <Text style={styles.notFoundText}>Cocktail not found</Text>
          }
          
        </Animated.View> 
      </LinearGradient>
    </View>
  );
};

export default Main;

