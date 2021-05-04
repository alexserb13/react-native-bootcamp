import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  form: {
    flex: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  formText: {
    fontSize: 18,
    marginTop: 35,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 8 : 0,
    alignItems: 'center',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 35,
  },
  signInText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009387',
  },
  errorMessage: {
    color: '#B00020',
    fontSize: 14,
    padding: 4,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
});
