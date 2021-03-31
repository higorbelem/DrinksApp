import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

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
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: '70%',
    height: 200,
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
    color: 'black'
  },
  inputButtton:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 60,
  },
  listView:{
    position: 'absolute',
    top: 10,
    width: '100%',
    height: height -70,
    alignItems: 'center',
  },
  list:{
    width: '100%'
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
  }
});