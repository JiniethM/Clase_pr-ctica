import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import GraficoSalarios from './src/components/GraficoSalarios';
import GraficoGeneros from './src/components/GraficoGenero';
import Formulario from './src/components/Formulario';
import GraficoReporteEnfermedades from './src/components/GraficoReporteEnfermedades';
import GraficoProgreso from './src/components/GraficoProgreso';
import GraficoBezier from './src/components/GraficoBezier';
import { collection, getDocs, query } from 'firebase/firestore';
import db from './database/firebaseconfig'; // Asegúrate de que la ruta sea correcta

export default function App() {
  const [bandera, setBandera] = useState(false);
  const [dataSalarios, setDataSalarios] = useState({
    labels: [''],
    datasets: [{ data: [0] }]
  });
  const [dataProgreso, setDataProgreso] = useState({
    labels: ['Hombres', 'Mujeres'],
    data: [0, 0]
  });
  const [dataGeneros, setDataGeneros] = useState([]);

  const dataReporteEnfermedades = [
    { date: "2017-01-05", count: 8 },
    { date: "2017-01-19", count: 5 },
    // ... otros datos
  ];

  // Carga de datos de salarios
  useEffect(() => {
    const recibirDatosSalarios = async () => {
      try {
        const q = query(collection(db, "personas"));
        const querySnapshot = await getDocs(q);
        const nombres = [];
        const salarios = [];

        querySnapshot.forEach((doc) => {
          const datosBD = doc.data();
          nombres.push(datosBD.nombre);
          salarios.push(datosBD.salario);
        });

        setDataSalarios({
          labels: nombres,
          datasets: [{ data: salarios }]
        });
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    recibirDatosSalarios();
  }, [bandera]);

  // Carga de datos de géneros
  useEffect(() => {
    const recibirDatosGeneros = async () => {
      try {
        const q = query(collection(db, "personas"));
        const querySnapshot = await getDocs(q);
        let masculino = 0;
        let femenino = 0;

        querySnapshot.forEach((doc) => {
          const datosBD = doc.data();
          if (datosBD.genero === "Masculino") {
            masculino += 1;
          } else if (datosBD.genero === "Femenino") {
            femenino += 1;
          }
        });

        const totalPersonas = masculino + femenino;
        const progresos = [masculino / totalPersonas, femenino / totalPersonas];

        setDataProgreso({
          labels: ['Hombres', 'Mujeres'],
          data: progresos
        });

        setDataGeneros([
          {
            name: "Masculino",
            population: masculino,
            color: "rgba(131, 167, 234, 0.5)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
          },
          {
            name: "Femenino",
            population: femenino,
            color: "rgba(255, 105, 180, 0.5)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
          }
        ]);
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };

    recibirDatosGeneros();
  }, [bandera]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Formulario setBandera={setBandera} />
        <GraficoSalarios dataSalarios={dataSalarios} />
        <GraficoBezier dataSalarios={dataSalarios} />
        <GraficoGeneros dataGeneros={dataGeneros} />
        <GraficoReporteEnfermedades dataReporteEnfermedades={dataReporteEnfermedades} />
        <GraficoProgreso dataProgreso={dataProgreso} colors={['rgba(131, 167, 234, 0.5)', 'rgba(255, 105, 180, 0.5)']} />
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
