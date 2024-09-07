import { ChartConfig, ChartData, ChartType } from "@/types/chartTypes";
import { FC } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryPie,
  VictoryLine,
  VictoryTheme,
} from "victory";

interface ChartSchema {
  schema: {
    chartType: ChartType;
  };
}

interface ChartComponentProps {
  schema: ChartConfig;
  data: ChartData;
}

const ChartComponent: FC<ChartComponentProps> = ({ schema, data }) => {
  const { chartType } = schema.schema;

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <VictoryBar data={data} />;
      case "pie":
        return <VictoryPie data={data} />;
      case "line":
        return <VictoryLine data={data} />;
      default:
        return null;
    }
  };

  return (
    <VictoryChart theme={VictoryTheme.material}>{renderChart()}</VictoryChart>
  );
};

export default ChartComponent;
