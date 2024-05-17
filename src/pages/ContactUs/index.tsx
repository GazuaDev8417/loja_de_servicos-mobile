import React from 'react'
import Zap from '@expo/vector-icons/FontAwesome'
import ContactIcon from '@expo/vector-icons/MaterialCommunityIcons'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Linking,
    TouchableOpacity
} from "react-native"



export default function ContactUs(){

    return(
        <ImageBackground style={styles.bgImage}
            source={require('../../../assets/terceirizacao.jpg')}>
            <View style={styles.container}>
                <Text style={styles.txtStyle}>
                    Esta aplicação é apenas um demonstrativo.
                    Se você tem uma ideia de aplicação
                    para sua empresa ou empreendimento entre em contato:
                </Text>
                <Text style={styles.txtContact}>
                    <TouchableOpacity
                        onPress={()=> Linking.openURL(
                            `mailto:francadasilvaflamarion@gmail.com`
                        )}>
                        <ContactIcon name='email-send' size={50} color='rgba(250,250,250,0.8)'/>
                    </TouchableOpacity>{'\n'}
                    francadasilvaflamarion@gmail.com{'\n\n\n'}
                    <TouchableOpacity
                        onPress={()=> Linking.openURL(
                            `https://api.whatsapp.com/send?phone=5571984407882`
                        )}>
                        <Zap name='whatsapp' size={50} color='green'/>
                    </TouchableOpacity>{'\n'}
                    71 8440-7882
                </Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1
      },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    txtStyle: {
        color: 'whitesmoke',
        textAlign: 'center',
        margin: '10%',
        marginBottom: '15%',
        fontSize: 17
    },
    txtContact: {
        color: 'whitesmoke',
        textAlign: 'center',
        fontSize: 20
    }
})