import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import GraficoSalarios from './src/components/GraficoSalarios';
import GraficoGeneros from './src/components/GraficoGenero';
import Formulario from './src/components/Formulario';
import GraficoReporteEnfermedades from './src/components/GraficoReporteEnfermedades';
import GraficoBezier from './src/components/GraficoBezier';
import GraficoProgreso from './src/components/GraficoProgreso'; // Importa tu componente
import { collection, getDocs, query } from 'firebase/firestore';
import db from './database/firebaseconfig';

export default function App() {
  const [bandera, setBandera] = useState(false);
  const [dataSalarios, setDataSalarios] = useState(null);
  const [dataGeneros, setDataGeneros] = useState(null);
  const [dataProgreso, setDataProgreso] = useState({
    labels: [''],
    data: [0],
  });

  const dataReporteEnfermedades = [
    { date: '2017-01-05', count: 8 },
    { date: '2017-01-19', count: 5 },
    // Otros datos...
  ];

  useEffect(() => {
    const recibirDatosSalarios = async () => {
      try {
        const q = query(collection(db, 'personas'));
        const querySnapshot = await getDocs(q);
        const nombres = [];
        const salarios = [];

        querySnapshot.forEach((doc) => {
          const datosBD = doc.data();
          const { nombre, salario } = datosBD;
          nombres.push(nombre);
          salarios.push(salario);
        });

        const validData = salarios.map((salario) => (typeof salario === 'number' ? salario : 0));

        if (nombres.length > 0 && validData.length > 0) {
          setDataSalarios({
            labels: nombres,
            datasets: [{ data: validData }],
          });
        } else {
          setDataSalarios({ labels: ['Sin datos'], datasets: [{ data: [0] }] });
        }
      } catch (error) {
        console.error('Error al obtener documentos: ', error);
        setDataSalarios({ labels: ['Error al cargar'], datasets: [{ data: [0] }] });
      }
    };

    recibirDatosSalarios();
  }, [bandera]);

  useEffect(() => {
    const recibirDatosGeneros = async () => {
      try {
        const q = query(collection(db, 'personas'));
        const querySnapshot = await getDocs(q);
        let masculino = 0;
        let femenino = 0;

        querySnapshot.forEach((doc) => {
          const datosBD = doc.data();
          const { genero } = datosBD;
          if (genero === 'Masculino') {
            masculino += 1;
          } else if (genero === 'Femenino') {
            femenino += 1;
          }
        });

        if (masculino > 0 || femenino > 0) {
          const totalPersonas = masculino + femenino;
          const progresos = [masculino / totalPersonas, femenino / totalPersonas];

          setDataGeneros([
            {
              name: 'Masculino',
              population: masculino,
              color: 'rgba(131, 167, 234, 0.5)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            },
            {
              name: 'Femenino',
              population: femenino,
              color: 'rgba(255, 105, 180, 0.5)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            },
          ]);

          setDataProgreso({
            labels: ['Hombres', 'Mujeres'],
            data: progresos,
          });
        } else {
          setDataGeneros([{ name: 'Sin datos', population: 0, color: '#ccc', legendFontColor: '#7F7F7F', legendFontSize: 12 }]);
        }
      } catch (error) {
        console.error('Error al obtener documentos: ', error);
        setDataGeneros([{ name: 'Error al cargar', population: 0, color: '#ccc', legendFontColor: '#7F7F7F', legendFontSize: 12 }]);
      }
    };

    recibirDatosGeneros();
  }, [bandera]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Formulario setBandera={setBandera} />
        {dataSalarios ? (
          <>
            <GraficoSalarios dataSalarios={dataSalarios} />
            <GraficoBezier dataSalarios={dataSalarios} />
          </>
        ) : (
          <Text>Cargando datos de salarios...</Text>
        )}
        {dataGeneros ? (
          <>
            <GraficoGeneros dataGeneros={dataGeneros} />
            <GraficoProgreso
              dataProgreso={dataProgreso}
              colors={['rgba(131, 167, 234, 0.5)', 'rgba(255, 105, 180, 0.5)']}
            />
          </>
        ) : (
          <Text>Cargando datos de géneros...</Text>
        )}
        <GraficoReporteEnfermedades dataReporteEnfermedades={dataReporteEnfermedades} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 10,
  },
});
