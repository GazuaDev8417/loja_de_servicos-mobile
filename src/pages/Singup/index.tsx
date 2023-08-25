import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/urls'
import { styles } from './styled'
import ScreenProps from '../../model/navigationTypes'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'



type Body = {
  name: string
  email: string
  password: string
  verifyPass: string
}

export default function Signup(props:ScreenProps<'Signup'>){
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [verifyPass, setVerifyPass] = useState<string>('')
  const placeholderBackground:string = 'rgba(255, 255, 255, 0.5)'
  

  
  const registUser = ():void=>{
    const body:Body = {
      name,
      email,
      password,
      verifyPass
    }
    
    axios.post(`${url}/signup`, body).then(async res=>{
      await AsyncStorage.setItem('id', res.data)
      props.navigation.navigate('List')
    }).catch(err=>{
      alert(err.response.data)
    })
    
  }


  const limpar = ():void=>{
    setName('')
    setEmail('')
    setPassword('')
    setVerifyPass('')
  }



  return(
    <ImageBackground
      source={ require('../../../assets/terceirizacao.jpg') }
      style={styles.bgImage}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput style={styles.input}
              onChangeText={setName}
              value={name}
              placeholderTextColor={placeholderBackground}
              placeholder='Nome de usuário'/>

            <TextInput style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholderTextColor={placeholderBackground}
              placeholder='nome@email.com'
              />

            <TextInput style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholderTextColor={placeholderBackground}
              placeholder='Sua senha'
              secureTextEntry={true}
              />

            <TextInput style={styles.input}
              onChangeText={setVerifyPass}
              value={verifyPass}
              placeholderTextColor={placeholderBackground}
              placeholder='Repita sua senha'
              secureTextEntry={true}
              />


            <View style={styles.btnContainer}>              
              <TouchableOpacity style={styles.btnNav}
                onPress={limpar}>
                <Text style={styles.txtBtn}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnNav}
                onPress={registUser}>
                <Text style={styles.txtBtn}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}


