import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

export default function GraficoProgreso({ dataProgreso, colors }) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {dataProgreso && (  // Verifica que `dataProgreso` esté presente antes de renderizar el gráfico
        <ProgressChart
          data={dataProgreso}
          width={screenWidth - 40}  // Ajusta el ancho a la pantalla
          height={220}              // Ajusta el alto del gráfico
          strokeWidth={16}          // Grosor del gráfico
          radius={32}               // Ajusta el radio de los círculos
          chartConfig={{
            backgroundColor: '#1c313a',
            backgroundGradientFrom: '#1c313a',
            backgroundGradientTo: '#0d47a1',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          hideLegend={false}         // Mostrar o no la leyenda
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
  },
});
