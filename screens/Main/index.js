import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  ActivityIndicator,
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
  const refreshing = useSelector((state) => state.cocktails.refreshing);

  const [searchValue, setSearchValue] = useState('');
  const [listVisible, setListVisible] = useState(false);
  const [iconPath, setIconPath] = useState(require('../../src/images/searchIcon.png'));

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
      height: withTiming(interpolate(logoOpacity.value, [0, 1], [0, 150])),
    };
  });

  const listOffset = useSharedValue(height);
  const listAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(listOffset.value)}],
    };
  });

  useEffect(()=>{
    if(searchValue.length > 2){
      dispatch({type: Types.SET_REFRESHING, payload: true});
      const timeOutId = setTimeout(async() => {
  
        const res = await fetchData(searchValue);
  
        dispatch({type: Types.SET_COCKTAILS, payload: res.drinks});
        dispatch({type: Types.SET_REFRESHING, payload: false});
      }, 100);
      return () => clearTimeout(timeOutId);
    }
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
              disabled={!setListVisible}
              onPress={async () => {
                if(listVisible){
                  setSearchValue('');
                  dispatch({type: Types.SET_COCKTAILS, payload: []});

                  inputOffset.value = START_POSITION;
                  logoOpacity.value = 1;
                  listOffset.value = height;
                  Keyboard.dismiss();
                }

                setIconPath(require('../../src/images/searchIcon.png'))
                setListVisible(false);
              }}
            >
              <Image 
                style={styles.icon}
                source={iconPath}
              />
            </TouchableOpacity>
            <TextInput 
              style={styles.input}
              placeholder="Search your favorite cocktail"
              placeholderTextColor='#4A4A4A'
              onChangeText={(text) => setSearchValue(text)}
              value={searchValue}
              onFocus={() => {
                inputOffset.value = 0;
                logoOpacity.value = 0;
                listOffset.value = 70;

                setIconPath(require('../../src/images/backIcon.png'))
                setListVisible(true);
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

        {
          refreshing && listVisible ? 
            <ActivityIndicator 
              style={styles.indicator}
              size='large'
              color='#d62b5e'
              animating={true}
            />
          :
            <></>
        }
        

      </LinearGradient>
    </View>
  );
};

export default Main;

