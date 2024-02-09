import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Pressable, TextInput } from 'react-native';
import { businessPageStyles } from '../styles/BusinessPageStyles';
import { styles as ResultScreenStyles } from '../styles/ResultScreenStyles.js';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TorType from '../components/TorType';
import firebase from 'firebase/app';
import { app, auth, db } from '../firebaseConfig';
import { getDoc, getDocs, collection, query, getFirestore, addDoc, where, doc } from 'firebase/firestore';
import { styles } from '../styles/ProfileClientScreenStyles';

const ProfileBusinessScreen = ({ navigation }) => {
    const [businessData, setBusinessData] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedPictures, setEditedPictures] = useState([]);
    const [editedLogo, setEditedLogo] = useState('');
    const [editedTorTypes, setEditedTorTypes] = useState([]);
    // State to track whether the fields are in edit mode
    const [editMode, setEditMode] = useState(false);

    const [docRef, setDocRef] = useState(undefined);

    useEffect(() => {
        const user = auth.currentUser;
        const clientsCollection = collection(db, "Businesses");
        const docRef = doc(clientsCollection, user.uid)
        setDocRef(docRef)

        const getData = async () => {
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    const data = docSnap.data();
                    setBusinessData(data);
                    console.log("busniess data:", businessData);
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            catch (error) {
                console.log(error);
            }

        }
        getData();
    }, []);
    const handleEditDescription = () => {
        console.log("busniess data:", businessData);
        console.log("Edit Description");
    };

    const handleAddPicture = () => {
        // Implement your logic to add more pictures
        const newPicture = { url: "https://picsum.photos/204" }; // Replace with actual logic
        setEditedPictures([...editedPictures, newPicture]);
    };

    const handleEditLogo = () => {
        // Implement your logic to edit the logo
        console.log("Edit Logo");
    };

    const handleAddTorType = () => {
        // Implement your logic to add more torTypes
        const newTorType = {
            duration: 60,
            name: "מסכת פנים",
            price: 120,
        }; // Replace with actual logic
        setEditedTorTypes([...editedTorTypes, newTorType]);
    };

    if (!businessData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#5B8BDF' }}>
            <ScrollView style={businessPageStyles.container}>
                <View style={styles.buttonsRow}>
                    {/* Display edit or save button based on edit mode */}
                    {editMode ? (
                        <Pressable style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>
                                שמירה
                            </Text>
                        </Pressable>

                    ) : (
                        <Pressable style={styles.button} onPress={() => setEditMode(true)}>
                            <Text style={styles.buttonText}>
                                עריכה
                            </Text>
                        </Pressable>
                    )}
                </View>
                {/* Logo and Business Name */}
                <View style={businessPageStyles.logoContainer}>
                    <Image source={{ uri: editedLogo }} style={businessPageStyles.logo} />
                    {/* Button to edit logo */}
                    <Pressable style={businessPageStyles.editLogoButton} onPress={handleEditLogo}>
                        <Text style={businessPageStyles.buttonText}>ערוך לוגו</Text>
                    </Pressable>
                    <Text style={businessPageStyles.businessName}>{businessData.name}</Text>
                </View>

                {/* Categories */}
                <View style={businessPageStyles.categoryContainer}>
                    <Text style={businessPageStyles.label}>תחום: </Text>
                    <Text style={businessPageStyles.category}>
                        {businessData.Categories.map((category, index) => (
                            <Text key={index}>{category}{index !== businessData.Categories.length - 1 ? ', ' : ''}</Text>
                        ))}
                    </Text>
                </View>

                {/* Category and Rating */}
                <View style={businessPageStyles.categoryContainer}>
                    {/* Assuming there's a function to render stars based on the rating */}
                    <Text style={businessPageStyles.label}>דירוג העסק: </Text>
                    {businessData.ratings && businessData.ratings.length > 0 && (
                        <Text style={businessPageStyles.rating}>{renderStars(businessData.ratings[0].rating)}</Text>)}
                </View>

                <Text style={businessPageStyles.label}>תמונות של העסק: </Text>
                {/* Business Photos */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={businessPageStyles.photosContainer}>
                    {editedPictures.map((picture, index) => (
                        <Image key={index} source={{ uri: picture.url }} style={businessPageStyles.photo} />
                    ))}
                    {/* Button to add more pictures */}
                    <Pressable style={businessPageStyles.addPictureButton} onPress={handleAddPicture}>
                        <Text style={businessPageStyles.buttonText}>הוסף תמונה</Text>
                    </Pressable>
                </ScrollView>

                {/* Business Description */}
                <Text style={businessPageStyles.label}>תיאור העסק: </Text>
                {editMode ? (
                    <View style={businessPageStyles.editDescriptionContainer}>
                        <TextInput
                            style={businessPageStyles.editDescriptionInput}
                            value={editedDescription}
                            onChangeText={(text) => handleEditDescription(text)}
                            multiline
                        />
                    </View>
                        ) : (
                        <Text style={businessPageStyles.description}>{businessData.businessDescription}</Text>
                )}


                        {/* Tor Types */}
                        <ScrollView contentOffset={{ x: 0, y: 10 }}>
                            <View style={ResultScreenStyles.container}>
                                {editedTorTypes && editedTorTypes.length > 0 ? (
                                    editedTorTypes.map(appointment => (
                                        <TorType key={appointment.name} appointment={appointment} />
                                    ))
                                ) : (
                                    <Text>No tor types available</Text>
                                )}
                            </View>
                            {/* Button to add more torTypes */}
                            <Pressable style={businessPageStyles.addTorTypeButton} onPress={handleAddTorType}>
                                <Text style={businessPageStyles.buttonText}>הוסף סוג טיפול</Text>
                            </Pressable>
                        </ScrollView>

                    </ScrollView>
    </View>
    );
};
// A function to render stars based on the rating (Assuming a 5-star scale)
const renderStars = (rating) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <Text key={index} style={businessPageStyles.star}>{index < rating ? '★' : '☆'}</Text>
    ));
    return <>{stars}</>;
};

export default ProfileBusinessScreen;
