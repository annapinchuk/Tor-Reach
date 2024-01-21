
import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#5B8BDF',
    alignItems: 'center',
    paddingTop: 40,
    flexDirection: 'column',
    gap: 15,
  },
  title: {
    fontSize: 24, // Increase the font size as needed
    color: 'white',
    marginBottom: 16,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#2C64C6',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 3,
    marginBottom: 16,
    paddingLeft: 8,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#2C64C6',
    width: 200,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  loginContainer: {
    flexDirection: 'row', // Ensure items are in the same row
    alignItems: 'center', // Align items vertically in the center
    marginTop: 16,
  },

  loginText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8, // Add margin to separate text and button
  },

});