import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5B8BDF',
        alignItems: 'center',
        paddingBottom: 40,
        paddingTop: 20,
        gap: 15,
    },
    card: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255 , 0.4)',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 30,
        flexDirection: 'column',
        gap: 10,
    },
    cardTopRow: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    cardMiddleRow: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconAndTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    businessLogo: {
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: 50,
        borderRadius: 15,
    },
    title: {
        fontWeight: "800",
        alignSelf: 'flex-start',
    },
    subTitle: {
        opacity: 0.6,
        alignSelf: 'flex-start',
    },
    button: {
        backgroundColor: '#3B82F6',
        width: 240,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
    },
    iconText: {
        fontWeight: 'bold',
        fontSize: 20, // Adjust the font size as needed
      },
    logo: {
        width: 70, // Adjust the width as needed
        height: 70, // Adjust the height as needed
        resizeMode: 'contain', // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
    },
})