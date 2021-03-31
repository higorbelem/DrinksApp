import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const {height} = Dimensions.get('window');

const bottomBarHeight = Dimensions.get('screen').height - Dimensions.get('window').height - StatusBar.currentHeight;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView:{
    position: 'absolute',
    top: 10,
    width: '100%',
    alignItems: 'center',
  },
  logoView:{
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: 150,
  },
  inputView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    flex: 1, 
    textAlign: 'center',
    height: 60,
    color: 'black',
    fontSize: 16,
  },
  inputButtton:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  icon: {
    width: 30,
    height: 30
  },
  listView:{
    position: 'absolute',
    top: 10,
    width: '100%',
    alignItems: 'center',
  },
  list:{
    width: '100%',
    height: height - 80 - bottomBarHeight,
  },
  itemView:{
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  itemImage:{
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  itemText:{
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    color: '#0f0f0f'
  },
  notFoundText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  indicator: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 100,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  }
});