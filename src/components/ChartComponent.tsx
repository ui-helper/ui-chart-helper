import {
  ChartConfig,
  ChartControl,
  ChartData,
  ChartType,
} from "@/types/chartTypes";
import { FC, useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryPie,
  VictoryLine,
  VictoryTheme,
} from "victory";

interface ChartComponentProps {
  config: ChartConfig;
  data: ChartData;
  formData: ChartControl;
}

const ChartComponent: FC<ChartComponentProps> = ({
  config,
  data,
  formData,
}) => {
  const { chartType } = config;

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <VictoryBar
            data={data}
            style={{
              data: {
                fill: formData.chartStyle.fillColor.value,
                stroke: formData.chartStyle.stroke.color.value,
                strokeWidth: formData.chartStyle.stroke.width.value,
              },
            }}
            labels={({ datum }) => `(${datum.x},${datum.y})`}
          />
        );
      case "pie":
        return <VictoryPie data={data} />;
      case "line":
        return <VictoryLine data={data} />;
      default:
        return null;
    }
  };

  return (
    formData && (
      <VictoryChart theme={VictoryTheme.material}>{renderChart()}</VictoryChart>
    )
  );
};

export default ChartComponent;
