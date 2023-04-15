import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import SearchSwitch from '@/common/components/SearchSwitch';
import useAuth from '@/common/hooks/useAuth';
import { ref, child, get, set } from 'firebase/database';
// @ts-ignore
import database from "../../firebaseConfig.tsx";


let searchResults: any[];

const SearchScreen = () => {

    const { spotify, user } = useAuth();
    const navigation = useNavigation();

    const [toggle, setToggle] = useState<boolean>(false); //false for genre search, true for artist search
    const [search, setSearch] = useState<string>(''); //keeps track of text entered in search bar dynamically
    const [loaded, setLoaded] = useState<boolean>(false); //keeps track of if a screen is done loading
    const [componentHandler, setComponentHandler] = React.useState<any>(); //keeps track of search results

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])

    useEffect(() => { //useEffect to change search results based on toggler state
        if (toggle === true) {
            //code for displaying artists from spotify
        } else if (toggle === false) {
            //code for displaying genres from spotify
        }
    }, [toggle]);

    async function getSearchResults() {

        const response = await spotify.getUserPlaylists(user?.id, { limit: 50 }
        ).then(
          function (data) {
            searchResults = data.items;
    
            const listItems = result.map(
              (element) => {
                return (
                  <View>
                    <TouchableOpacity onPress={
                      () => {
                        //add
                      }
                    }>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white' }}> {element.name} </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              }
            )
            setComponentHandler(listItems);
            setLoaded(true)
            //https://www.geeksforgeeks.org/how-to-render-an-array-of-objects-in-reactjs/
          });
      }

    return (
        <View className='flex-1 justify-center'>
            <LinearGradient start={{ x: -0.5, y: 0 }} colors={['#014871', '#A0EBCF']} className="flex-1 items-center justify-center">
                <View className='absolute top-11'>
                    <SearchSwitch text = {toggle.toString()} value = {false} onValueChange={setToggle}/>
                </View>
                <View className='absolute top-20'>
                    <Text className="text-white text-xl px-5 py-2 text-1 font-semibold text-center">This is the search screen. It looks like shit right now but it will allow you to search for 5 seed artists/genres for making a new deck</Text>
                    <TextInput placeholderTextColor={"#0B0B45"} placeholder='Search' onChangeText={setSearch} className='mx-5 font-semibold text-1 text-white text-xl flex-row items-center justify-center rounded-3xl top-5 px-8 py-2.5' style={{ backgroundColor: '#014871' }}></TextInput>
                </View>
            </LinearGradient>
        </View>
    )
}

export default SearchScreen