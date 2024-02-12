import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Pressable, TextInput, LogBox } from 'react-native';
import TorType from '../components/TorType';
import { app, auth, db } from '../firebaseConfig';
import { collection, getDoc, setDoc, doc, getDocs, query, limit } from 'firebase/firestore';
import TorTypeInput from '../components/TorTypeInput';
import DropDownPicker from 'react-native-dropdown-picker';
import PhoneButton from '../components/PhoneButton';
import { Feather } from '@expo/vector-icons';
import TimePicker from '../components/TimePicker.js';
import { getHour } from '../shared/dateMethods.js';
import { ProfileBusinessScreenStyles } from '../styles/ProfileBusinessScreenStyles.js';
const ProfileBusinessScreen = ({ navigation }) => {
    const [businessData, setBusinessData] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedPictures, setEditedPictures] = useState([]);
    const [editedLogo, setEditedLogo] = useState('');
    const [editedName, setEditedName] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedTorTypes, setEditedTorTypes] = useState([]);
    const [editedCategories, setEditedCategories] = useState([]);
    const [editedCities, setEditedCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isOpenCategories, setIsOpenCategories] = useState(false);
    const [currentValueCategories, setCurrentValueCategories] = useState([]);
    const [Cities, setCities] = useState([]);
    const [isOpenCities, setIsOpenCities] = useState(false);
    const [currentValueCities, setCurrentValueCities] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    // State to track whether the fields are in edit mode
    const [editMode, setEditMode] = useState(false);
    const [docRef, setDocRef] = useState(undefined);

    const fetchCategories = async () => {
        try {
            const categoriesCollection = collection(db, 'Categories');
            const categoriesSnapshot = await getDocs(categoriesCollection);
            const categoriesData = categoriesSnapshot.docs.map(
                (doc) => doc.data().name
            );
            setCategories(categoriesData);
        } catch (error) {
            console.error('Firebase initialization error:', error);
        }
    };
    const fetchCities = async () => {
        try {
            const citiessCollection = collection(db, 'Cities');
            const citiesQuery = query(citiessCollection, limit(10));
            const citiesSnapshot = await getDocs(citiesQuery);
            const citiesData = citiesSnapshot.docs.map(
                (doc) => doc.data().name
            );
            setCities(citiesData);
        } catch (error) {
            console.error('Firebase initialization error:', error);
        }
    };
    useEffect(() => {
        fetchCategories();
        fetchCities();
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        const user = auth.currentUser;
        const clientsCollection = collection(db, "Businesses");
        const docRef = doc(clientsCollection, user.uid)
        setDocRef(docRef)

        const getData = async () => {
            const defaultStartTime = new Date();
            defaultStartTime.setHours(9, 0, 0, 0);
            const defaultEndTime = new Date();
            defaultEndTime.setHours(18, 0, 0, 0);
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    const data = docSnap.data();
                    setBusinessData(data);
                    setEditedName(data.businessName);
                    setEditedPhone(data.businessPhoneNumber);
                    setEditedDescription(data.businessDescription);
                    setEditedPictures(data.pictures ?? []);
                    setEditedTorTypes(data.torTypes ?? []);
                    setEditedLogo(data.logo ?? '');
                    setEditedCategories(data.Categories);
                    setCurrentValueCategories(data.Categories);
                    setEditedCities(data.Cities);
                    setCurrentValueCities(data.Cities);
                    setEditedAddress(data.address);
                    setStartTime(data.startTime ? new Date(data.startTime.seconds * 1000) : defaultStartTime)
                    setEndTime(data.endTime ? new Date(data.endTime.seconds * 1000) : defaultEndTime)
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

    const handleSave = async () => {
        setEditedCategories(currentValueCategories);
        setEditedCities(currentValueCities);
        const newData = {
            ...businessData,
            businessName: editedName,
            businessDescription: editedDescription,
            pictures: editedPictures,
            torTypes: editedTorTypes,
            logo: editedLogo,
            Categories: currentValueCategories,
            Cities: currentValueCities,
            businessPhoneNumber: editedPhone,
            address: editedAddress,
            startTime,
            endTime
        }
        await setDoc(docRef, newData).then(() => {
            console.log("Document has been changed successfully");
        })
            .catch(error => {
                console.log(error);
            })

        setEditMode(false);
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

    const handleAddTorType = newTorType => {
        setEditedTorTypes([...editedTorTypes, newTorType]);
    };

    const handleLogout = () => {
        auth.signOut();
        navigation.navigate('LoginScreen')
    };

    const handleDeleteTorType = (torTypeToDelete) => {
        // Implement logic to remove torTypeToDelete from the state
        const updatedTorTypes = editedTorTypes.filter(torType => torType !== torTypeToDelete);
        setEditedTorTypes(updatedTorTypes);
      };

    if (!businessData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#5B8BDF' }}>
            <ScrollView style={ProfileBusinessScreenStyles.container}>
                <View style={ProfileBusinessScreenStyles.buttonsRow}>
                    {/* Display edit or save button based on edit mode */}
                    {editMode ? (
                        <Pressable style={ProfileBusinessScreenStyles.button} onPress={handleSave}>
                            <Text style={ProfileBusinessScreenStyles.buttonText}>
                                שמירה
                            </Text>
                        </Pressable>

                    ) : (
                        <Pressable style={ProfileBusinessScreenStyles.button} onPress={() => setEditMode(true)}>
                            <Text style={ProfileBusinessScreenStyles.buttonText}>
                                עריכה
                            </Text>
                        </Pressable>
                    )}
                    {/* Logout button */}
                    <Pressable onPress={handleLogout} style={ProfileBusinessScreenStyles.logoutButton}>
                        {/* <Text style={styles.buttonText}> */}
                        <Text style={ProfileBusinessScreenStyles.buttonText}>
                            התנתקות
                        </Text>
                    </Pressable>
                </View>

                {/* Logo and Business Name */}
                <View style={ProfileBusinessScreenStyles.logoContainer}>
                    {editedLogo && <Image source={{ uri: editedLogo }} style={ProfileBusinessScreenStyles.logo} />}
                    {/* Button to edit logo */}
                    {editMode ? (
                        <View>
                            <Pressable style={ProfileBusinessScreenStyles.editLogoButton} onPress={handleEditLogo}>
                                <Text style={ProfileBusinessScreenStyles.buttonText}>ערוך לוגו</Text>
                            </Pressable>
                            <TextInput
                                style={ProfileBusinessScreenStyles.editDescriptionInput}
                                value={editedName}
                                onChangeText={(text) => setEditedName(text)}
                            />
                        </View>


                    ) : (
                        <Text style={ProfileBusinessScreenStyles.businessName}>{editedName}</Text>
                    )}
                </View>
                {/* Phone */}


                {editMode ? (
                    <View style={ProfileBusinessScreenStyles.editDescriptionContainer}>
                        <Text style={ProfileBusinessScreenStyles.label}>טלפון: </Text>
                        <TextInput
                            style={{ ...ProfileBusinessScreenStyles.editDescriptionInput, textAlign: 'right' }}
                            value={editedPhone}
                            onChangeText={(text) => setEditedPhone(text)}
                        />
                    </View>
                ) : (
                    <View style={ProfileBusinessScreenStyles.categoryContainer}>
                        <Text style={ProfileBusinessScreenStyles.label}>טלפון: </Text>
                        <PhoneButton phoneNumber={editedPhone} />
                        <Feather name="phone-call" size={24} color="white" />
                    </View>
                )}
                {/* Adress*/}
                {editMode ? (
                    <View style={ProfileBusinessScreenStyles.editDescriptionContainer}>
                        <Text style={ProfileBusinessScreenStyles.label}>כתובת: </Text>
                        <TextInput
                            style={{ ...ProfileBusinessScreenStyles.editDescriptionInput, textAlign: 'right' }}
                            value={editedAddress}
                            onChangeText={(text) => setEditedAddress(text)}
                        />
                    </View>
                ) : (
                    <View style={ProfileBusinessScreenStyles.categoryContainer}>
                        <Text style={ProfileBusinessScreenStyles.label}>כתובת: </Text>
                        <Text style={ProfileBusinessScreenStyles.category}> {editedAddress} </Text>
                        {/* <NavigationButton destination={business.address} /> */}
                    </View>
                )}



                {editMode ? (<Text style={ProfileBusinessScreenStyles.label}>תחום: </Text>) : (<View></View>)}
                {/* Categories */}
                <View style={[ProfileBusinessScreenStyles.categoryContainer, { zIndex: 4 }]}>
                    {editMode ? (

                        <DropDownPicker
                            items={categories.map((category) => ({ label: category, value: category }))}
                            open={isOpenCategories}
                            setOpen={() => setIsOpenCategories(!isOpenCategories)}
                            value={currentValueCategories}
                            setValue={(val) => setCurrentValueCategories(val)}
                            dropDownDirection='DOWN'
                            multiple={true}
                            min={1}
                            max={4}
                            showArrowIcon={false}
                            mode='BADGE'
                            badgeColors={'#2C64C6'}
                            badgeDotColors={['white']}
                            listMode={Platform.OS === 'ios' ? 'FLATLIST' : 'MODAL'}
                            badgeTextStyle={{ color: "white" }}
                            placeholder="תחום עסק "
                            placeholderStyle={ProfileBusinessScreenStyles.placeHolderStyle}
                            style={ProfileBusinessScreenStyles.dropdownStyle}
                            itemStyle={ProfileBusinessScreenStyles.dropdownItemStyle}
                            dropDownStyle={ProfileBusinessScreenStyles.dropdownListStyle}
                            searchable={true}
                            searchPlaceholder="חיפוש..."
                        />
                    ) : (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={ProfileBusinessScreenStyles.label}>תחום: </Text>
                            <Text style={ProfileBusinessScreenStyles.category}>
                                {editedCategories.map((category, index) => (
                                    <Text key={index}>{category}{index !== editedCategories.length - 1 ? ', ' : ''}</Text>
                                ))}
                            </Text>
                        </View>

                    )}
                </View>

                {/* Cities */}
                {editMode ? (<Text style={ProfileBusinessScreenStyles.label}>ערים: </Text>) : (<View></View>)}
                <View style={[ProfileBusinessScreenStyles.categoryContainer, { zIndex: 3 }]}>
                    {editMode ? (
                        <DropDownPicker
                            items={Cities.map((city) => ({ label: city, value: city }))}
                            open={isOpenCities}
                            setOpen={() => setIsOpenCities(!isOpenCities)}
                            value={currentValueCities}
                            setValue={(val) => setCurrentValueCities(val)}
                            dropDownDirection='DOWN'
                            multiple={true}
                            min={1}
                            max={5}
                            showArrowIcon={false}
                            mode='BADGE'
                            badgeColors={'#2C64C6'}
                            badgeDotColors={['white']}
                            listMode={Platform.OS === 'ios' ? 'FLATLIST' : 'MODAL'}
                            badgeTextStyle={{ color: "white" }}
                            placeholder="ערים"
                            placeholderStyle={ProfileBusinessScreenStyles.placeHolderStyle}
                            style={ProfileBusinessScreenStyles.dropdownStyle}
                            itemStyle={ProfileBusinessScreenStyles.dropdownItemStyle}
                            dropDownStyle={ProfileBusinessScreenStyles.dropdownListStyle}
                            searchable={true}
                            searchPlaceholder="חיפוש..."
                        />
                    ) : (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={ProfileBusinessScreenStyles.label}>ערים: </Text>
                            <Text style={ProfileBusinessScreenStyles.category}>
                                {editedCities.map((category, index) => (
                                    <Text key={index}>{category}{index !== editedCities.length - 1 ? ', ' : ''}</Text>
                                ))}
                            </Text>
                        </View>

                    )}
                </View>

                {/* Category and Rating */}
                <View style={[ProfileBusinessScreenStyles.categoryContainer, { zIndex: 1 }]}>
                    {/* Assuming there's a function to render stars based on the rating */}
                    <Text style={ProfileBusinessScreenStyles.label}>דירוג העסק: </Text>
                    {businessData.ratings && businessData.ratings.length > 0 && (
                        <Text style={ProfileBusinessScreenStyles.rating}>{renderStars(businessData.ratings[0].rating)}</Text>)}
                </View>

                <Text style={ProfileBusinessScreenStyles.label}>תמונות של העסק: </Text>
                {/* Business Photos */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={ProfileBusinessScreenStyles.photosContainer}>
                    {(editedPictures.map((picture, index) => (
                        <Image key={index} source={{ uri: picture.url }} style={ProfileBusinessScreenStyles.photo} />
                    )))}
                    {/* Button to add more pictures */}
                    {editMode ? (
                        <Pressable style={ProfileBusinessScreenStyles.addPictureButton} onPress={handleAddPicture}>
                            <Text style={ProfileBusinessScreenStyles.buttonText}>הוסף תמונה</Text>
                        </Pressable>
                    ) : (
                        <View></View>
                    )}
                </ScrollView>

                {/* Business Description */}
                <Text style={ProfileBusinessScreenStyles.label}>תיאור העסק: </Text>
                {editMode ? (
                    <View style={ProfileBusinessScreenStyles.editDescriptionContainer}>
                        <TextInput
                            style={{ ...ProfileBusinessScreenStyles.editDescriptionInput, textAlign: 'right' }}
                            value={editedDescription}
                            onChangeText={(text) => setEditedDescription(text)}
                            multiline
                        />
                    </View>
                ) : (
                    <Text style={ProfileBusinessScreenStyles.description}>{editedDescription ? editedDescription : ("אין תיאור לעסק זה")}</Text>
                )}

                {/* business hours */}
                <View style={{ flexDirection: 'column', gap: 10 }}>
                    <Text style={ProfileBusinessScreenStyles.label}>שעות פעילות העסק:</Text>

                    <View style={[ProfileBusinessScreenStyles.categoryContainer, { alignItems: 'center' }]}>
                        <Text style={ProfileBusinessScreenStyles.subLabel}>שעת פתיחה:</Text>
                        {
                            editMode ? (<TimePicker time={startTime} setTime={setStartTime} />) :
                                (<Text style={ProfileBusinessScreenStyles.category}> {getHour(startTime)} </Text>)
                        }
                    </View>
                    <View>
                        <View style={[ProfileBusinessScreenStyles.categoryContainer, { alignItems: 'center' }]}>
                            <Text style={ProfileBusinessScreenStyles.subLabel}>שעת סיום:</Text>
                            {
                                editMode ? (<TimePicker time={endTime} setTime={setEndTime} />) :
                                    (<Text style={ProfileBusinessScreenStyles.category}> {getHour(endTime)} </Text>)
                            }
                        </View>
                    </View>
                </View>
                {/* Tor Types */}
                <ScrollView contentOffset={{ x: 0, y: 10 }}>
                    <Text style={ProfileBusinessScreenStyles.label}> סוגי תורים</Text>
                    <View style={ProfileBusinessScreenStyles.containerTorim}>
                        {editedTorTypes && editedTorTypes.length > 0 ? (
                            editedTorTypes.map(appointment => (
                                <TorType 
                                    key={appointment.name} 
                                    appointment={appointment}
                                    onDelete={editMode ? ((appointment) => handleDeleteTorType(appointment)) : (undefined)} />
                            ))
                        ) : (
                            <View>
                                <Text style={{textAlign:'center'}}>שים לב! אין סוג תור. </Text>
                                <Text style={{textAlign:'center'}}> כדי שלקוחות יכלו לקבוע תור עם העסק יש להוסיף לפחות סוג תור אחד</Text>
                            </View>
                        )}
                    </View>
                    {/* Button to add more torTypes */}
                    {editMode && <TorTypeInput onAddTorType={handleAddTorType} />}

                </ScrollView>
            </ScrollView >
        </View >
    );
};
// A function to render stars based on the rating (Assuming a 5-star scale)
const renderStars = (rating) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <Text key={index} style={ProfileBusinessScreenStyles.star}>{index < rating ? '★' : '☆'}</Text>
    ));
    return <>{stars}</>;
};

export default ProfileBusinessScreen;
