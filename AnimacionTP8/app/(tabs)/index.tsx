import React, { useEffect } from 'react';
import { Image, StyleSheet,  View } from 'react-native';
import { Button} from 'react-native-paper';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export default function HomeScreen() {
  const delizarTitle = useSharedValue(-50); // para que apararesca el titulo
  const ocultarTitle = useSharedValue(0); // ocultar el título
  //le agregue un color inicial al fondo para despues cambiarlo
  const backgroundColor = useSharedValue('rgba(255, 182, 193, 1)'); 

  
  // cuando la pantalla se carge va a parecer el titulo
  useEffect(() => {
    delizarTitle.value = withSpring(0, { damping: 12 });
    ocultarTitle.value = withTiming(1, { duration: 1000 });
  }, []);

  // Función para la animacion del boton 
  const handlePress = () => {
    // primero que al precionar iniciar oculte el titulo
    ocultarTitle.value = withTiming(0, { duration: 1000 });

    // Luego cambiar el color del fondo
    backgroundColor.value = withTiming('rgba(238, 10, 145, 1)', { duration: 1000 });
  };

  // funcion para asignarle la animacion al titulo
  const StyleAnimadoTitle = useAnimatedStyle(() => {
    return {
      opacity: ocultarTitle.value,
      transform: [{ translateY: delizarTitle.value }],
    };
  });

  // funcion para asignarle la animacion al fondo
  const StyleAnimadoFondo = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  return (
    <Animated.View style={[styles.container, StyleAnimadoFondo]}>
      <Image
        source={require('@/assets/images/makeup.jpg')}
        style={styles.reactLogo}
      />

      {/* Titulo*/}
      <Animated.Text style={[styles.animatedText, StyleAnimadoTitle]}>
      💓Diviértete Conmigo💓
      </Animated.Text>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 50 }}>
      {/* Botón de iniciar */}
      <Button icon="heart" mode="contained" onPress={handlePress} style={styles.Button}>
        Iniciar
      </Button>
    </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedText: {
    fontSize: 24,
    color: 'black',
    position: 'absolute',
    top: '40%',
  },
  reactLogo: {
    height:100,
    width: 100,
    bottom: 0,
    left: 0,
  },
  Button:{
    width: 200,
    height: 50,
    backgroundColor: '#ff8cd6'
  },
});
