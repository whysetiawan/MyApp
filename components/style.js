import { StyleSheet, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
  	color: '#19b3fa',
  	fontSize: 24,
  	fontWeight: 'bold',
  	marginBottom: 15
  },
  loginInput: {
  	width: 320,
  	height: 40,
  	borderWidth: 2.5,
  	borderColor: '#19b3fa',
  	borderRadius: 5,
  	margin: 7,
  	color: '#000000'
  },
  button: {
  	width: 320,
  	height: 40,
  	alignItems: 'center',
  	justifyContent: 'center',
  	backgroundColor: '#19b3fa',
  	borderRadius: 5,
  	margin: 10,
  	elevation: 5,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  buttonText: {
  	color: 'white',
  	fontSize: 17,
  	fontWeight: '500',
  },
  facebookButton: {
  	height: 40,
  	width: 320,
  	margin: 10
  },
  googleButton :{
  	height: 46,
  	width: 328,
  },
  genderPicker: {
  	width: 320,
  	height: 40,
  	margin: 10
  },
  uploadImg: {
  	width:100, 
  	height:100,
  	borderRadius:50
  },
  multipleInput: {
  	width:320,
  	height:150,
  	borderWidth: 2.5,
  	borderColor: '#19b3fa',
  	borderRadius: 5,
  	margin: 7,
  	color: '#000000'
  },
  multipleAdd: {
  	flex:2,
  	flexDirection: 'column'
  },
  multipleTextInput: {
  	width: 103,
  	height: 40,
  	borderWidth: 2.5,
  	borderColor: '#19b3fa',
  	borderRadius: 5,
  	margin: 7,
  	color: '#000000'
  },
  listProduct: {
  	width: 360,
  	elevation: 3,
  	backgroundColor: '#FFFFFF',
  	margin: 5
  },
  titleProduct: {
  	fontSize: 14,
  	color: '#000000',
  	margin: 5
  },
  textProduct: {
  	fontSize: 14,
  	color: '#444444',
  	marginLeft: 10
  },
  textButtonProduct: {
  	fontSize: 17,
  	fontWeight: '500',
  	color: '#FFFFFF',
  },
  nameTimeline: {
  	fontSize: 18,
  	fontWeight: 'bold',
  	color: '#FFFFFF',
  },
  header: {
  	backgroundColor:'#33373f', 
  	height:50, 
  	width:420,
  	alignItems: 'center',
  	justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:10
  },
  conDetailProduct: {
  	flex:1,
  	backgroundColor: '#FFFFFF',
  },
  headDetailProduct: {
  	backgroundColor:'#19b3fa',
  	height:50,
  	justifyContent: 'center',
  	marginBottom: 10,
  	elevation: 3,
  },
  textTitleProduct: {
  	fontSize: 18,
  	fontWeight: 'bold',
  	color: '#FFFFFF',
    marginTop: 7
  },
  textNameProduct: {
  	fontSize: 15,
  	color: '#222',
    margin: 5
  },
  textDescProduct: {
  	fontSize: 14,
  	color: '#000000',
  	margin: 10 
  },
  textPayProduct: {
    fontSize: 15,
    color: 'white',
    margin: 10,
    fontWeight: '600'
  },
  headDetailProduct2: {    
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addItem: {
    borderWidth:2,
    borderColor:'#eee',
    paddingLeft:4,
    paddingRight:4,
    marginRight: 10
  },
  pageTimeline: {    
    marginRight: 10
  }
})

export default styles;