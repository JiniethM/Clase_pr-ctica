import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function GraficoGeneros({ dataGeneros }) {
  let screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <PieChart
        data={dataGeneros}
        width={screenWidth - (screenWidth * 0.1)}
        height={300}
        chartConfig={{
          backgroundColor: '#022173',
          backgroundGradientFrom: '#022173',
          backgroundGradientTo: '#1b3fa0',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
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
