import React, { useState, useContext } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/urls'
import styles from './style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ScreenProps from '../../model/navigationTypes'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'



export default function Register(props:ScreenProps<'Register'>){
  const { getAllJobs } = useContext(Context)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [period, setPeriod] = useState<string>('')
  const placeholderBackground:string = 'rgba(255, 255, 255, 0.5)'
  

  
  const registJob = async():Promise<void>=>{
    const body = {
      title,
      description,
      phone,
      period
    }
    
    axios({
      method:'POST',
      url:`${url}/jobs`,
      headers: {
        Authorization: await AsyncStorage.getItem('id')
      },
      data: body
    }).then(res=>{
      alert(res.data)
      props.navigation.navigate('List')
      getAllJobs()
    }).catch(e=>{
      alert(e.response.data)
    })
    
  }


  const limpar = ():void=>{
    setDescription('')
    setPeriod('')
    setPhone('')
    setTitle('')
  }



  return(
    <ImageBackground
      source={ require('../../../assets/terceirizacao.jpg') }
      style={styles.bgImage}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholderTextColor={placeholderBackground}
              placeholder='Título'
              />

            <TextInput style={styles.textarea}
              onChangeText={setDescription}
              value={description}
              multiline={true}
              placeholderTextColor={placeholderBackground}
              placeholder='Descrição dos seus serviços'
              />

            <TextInput style={styles.input}
              onChangeText={setPhone}
              value={phone}
              maxLength={11}
              keyboardType='numeric'
              placeholderTextColor={placeholderBackground}
              placeholder='Telefone'
              />

            <TextInput style={styles.textarea}
              onChangeText={setPeriod}
              value={period}
              multiline={true}
              placeholderTextColor={placeholderBackground}
              placeholder='Período de atendimento'
              />


            <View style={styles.btnContainer}>              
              <TouchableOpacity style={styles.btnNav}
                onPress={limpar}>
                <Text style={styles.txtBtn}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnNav}
                onPress={registJob}>
                <Text style={styles.txtBtn}>Cadastrar serviço</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}
