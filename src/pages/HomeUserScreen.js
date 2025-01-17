import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { styles as styles } from '../styles/HomeUserScreenStyles';
import { styles as ResultScreenStyles } from '../styles/ResultScreenStyles.js';
import ResultCard from '../components/ResultCard';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';
import { collection, getDocs, limit, query, where } from '@firebase/firestore';
import { db } from '../firebaseConfig';


const HomeUserScreen = ({ navigation }) => {

  //shows 10 random businesses
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const businessesCollection = collection(db, "Businesses");
        const businessesQuery = query(businessesCollection, limit(10));
        const businessesSnapshot = await getDocs(businessesQuery);
        const docb = businessesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setBusinesses(docb ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    getBusinesses();
  }, []);




  return (

    //search button 
    <View style={styles.container}>
      <Pressable style={[styles.button, styles.pressableWithMargin]} onPress={() => navigation.navigate('SearchScreen')}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}><FontAwesome name="search" size={24} color="white" />                                      חיפוש תור</Text>
        </View>
      </Pressable>


      <View style={{ height: 150 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.iconScrollView}
          contentOffset={{ x: 5, y: -15 }} // Adjust the value based on your needs
        >

        {/* category 1 */}
          <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCategories: ["טיפול"] })} style={styles.container_icon}>
            <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
              <FontAwesome name="circle-thin" size={100} color="white" />
              <FontAwesome5 name="hands" size={40} color="white" style={styles.icon_icon} />
            </View>
            <Text style={[styles.iconText, { textAlign: 'center' }]}>טיפול</Text>
          </Pressable>

        {/* category 2 */}
          <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCategories: ["חיות"] })} style={styles.container_icon}>
            <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
              <FontAwesome name="circle-thin" size={100} color="white" />
              <FontAwesome5 name="dog" size={40} color="white" style={styles.icon_icon} />
            </View>
            <Text style={[styles.iconText, { textAlign: 'center' }]}>חיות</Text>
          </Pressable>

        {/* category 3 */}
          <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCategories: ["טכנאים"] })} style={styles.container_icon}>
            <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
              <FontAwesome name="circle-thin" size={100} color="white" />
              <MaterialCommunityIcons name="hammer-wrench" size={50} color="white" style={styles.icon_icon} />
            </View>
            <Text style={[styles.iconText, { textAlign: 'center' }]}>טכנאים</Text>
          </Pressable>

        {/* category 4 */}
          <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCategories: ["מספרה"] })} style={styles.container_icon}>
            <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
              <FontAwesome name="circle-thin" size={100} color="white" />
              <MaterialCommunityIcons name="hair-dryer-outline" size={50} color="white" style={styles.icon_icon} />
            </View>
            <Text style={[styles.iconText, { textAlign: 'center' }]}>מספרה</Text>
          </Pressable>

        {/* category 5 */}
          <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCategories: ["ניקיון"] })} style={styles.container_icon}>
            <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
              <FontAwesome name="circle-thin" size={100} color="white" />
              <MaterialCommunityIcons name="broom" size={50} color="white" style={styles.icon_icon} />
            </View>
            <Text style={[styles.iconText, { textAlign: 'center' }]}>ניקיון</Text>
          </Pressable>

        {/* category 6 */}
           <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCategories: ["ימי הולדת"] })} style={styles.container_icon}>
            <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
              <FontAwesome name="circle-thin" size={100} color="white" />
              <FontAwesome name="birthday-cake" size={40} color="white" style={styles.icon_icon} />
            </View>
            <Text style={[styles.iconText, { textAlign: 'center' }]}>ימי הולדת</Text>
          </Pressable>

        {/* category 7 */}
          <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCategories: ["כושר"] })} style={styles.container_icon}>
            <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
              <FontAwesome name="circle-thin" size={100} color="white" />
              <MaterialCommunityIcons name="weight-lifter" size={50} color="white" style={styles.icon_icon} />
            </View>
            <Text style={[styles.iconText, { textAlign: 'center' }]}>כושר</Text>
          </Pressable>

        {/* category 8 */}
          <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCategories: ["אוכל"] })} style={styles.container_icon}>
            <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
              <FontAwesome name="circle-thin" size={100} color="white" />
              <MaterialCommunityIcons name="silverware-fork-knife" size={50} color="white" style={styles.icon_icon} />
            </View>
            <Text style={[styles.iconText, { textAlign: 'center' }]}>אוכל</Text>
          </Pressable>

        {/* category 9 */}
          <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCategories: ["קוסמטיקה"] })} style={styles.container_icon}>
            <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
              <FontAwesome name="circle-thin" size={100} color="white" />
              <MaterialCommunityIcons name="face-woman-shimmer" size={50} color="white" style={styles.icon_icon} />
            </View>
            <Text style={[styles.iconText, { textAlign: 'center' }]}>קוסמטיקה</Text>
          </Pressable>


        </ScrollView>
      </View>
      <Text style={[styles.iconText, { color: 'black' }]}>אולי זה יכול לעניין אותך</Text>
      <ScrollView contentOffset={{ x: 0, y: 10 }} >
        <View style={ResultScreenStyles.container}>
          {businesses.map(business => <ResultCard key={business.id} navigation={navigation} business={business} />)}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeUserScreen;
