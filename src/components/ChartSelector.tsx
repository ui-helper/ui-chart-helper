import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartConfig } from "@/types/chartTypes";
import { FC } from "react";

interface ChartSelectorProps {
  chartConfig: ChartConfig[];
  selectedChartId: number;
  setSelectedChartId: (id: number) => void;
}

const ChartSelector: FC<ChartSelectorProps> = ({
  chartConfig,
  selectedChartId,
  setSelectedChartId,
}) => {
  return (
    <div className="h-30">
      <Select
        defaultValue={String(selectedChartId)}
        onValueChange={(value) => setSelectedChartId(Number(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Chart Type" />
        </SelectTrigger>
        <SelectContent>
          {chartConfig.map((chart) => (
            <SelectItem key={chart.id} value={String(chart.id)}>
              {chart.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChartSelector;
