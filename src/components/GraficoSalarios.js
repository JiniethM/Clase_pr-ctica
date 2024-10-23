import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, Text, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get("window").width;

export default function GraficoBezier({ dataSalarios }) {
  // Verificar que los datos no sean nulos o indefinidos
  if (!dataSalarios || !dataSalarios.labels || !dataSalarios.datasets || !dataSalarios.datasets[0].data.length) {
    return <Text>No hay datos disponibles para mostrar el gráfico</Text>;
  }

  return (
    <View style={styles.container}>
      <LineChart
        data={dataSalarios}
        width={screenWidth - (screenWidth * 0.1)}
        height={300}
        chartConfig={{
          backgroundGradientFrom: "#00FFFF",
          backgroundGradientFromOpacity: 0.1,
          backgroundGradientTo: "#FFFFFF",
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          strokeWidth: 1,
          barPercentage: 0.5,
        }}
        bezier={true}
        style={{ borderRadius: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
  },
});
