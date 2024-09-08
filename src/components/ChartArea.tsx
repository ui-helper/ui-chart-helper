import { ChartConfig, ChartControl, ChartData } from "@/types/chartTypes";
import ChartComponent from "@/components/ChartComponent";
import { FC } from "react";

interface ChartAreaProps {
  selectedChartConfig: ChartConfig | undefined;
  formData: ChartControl | null;
  chartData: ChartData;
}

const ChartArea: FC<ChartAreaProps> = ({
  selectedChartConfig,
  formData,
  chartData,
}) => {
  return (
    <div className="h-[500px] bg-muted p-2 rounded-md">
      Chart Area
      {selectedChartConfig && formData && (
        <ChartComponent
          config={selectedChartConfig}
          data={chartData}
          formData={formData}
        />
      )}
    </div>
  );
};

export default ChartArea;
