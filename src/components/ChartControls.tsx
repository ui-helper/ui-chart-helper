import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartControl } from "@/types/chartTypes";
import renderFields from "@/components/renderFields";
import { FC } from "react";

interface ChartControlsProps {
  selectedChartConfig: ChartConfig | undefined;
  handleChange: (key: string, newValue: any) => void;
}

const ChartControls: FC<ChartControlsProps> = ({
  selectedChartConfig,
  handleChange,
}) => {
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader className="bg-gray-800 text-white p-4 rounded-t-lg">
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="p-4 bg-white rounded-b-lg">
        {selectedChartConfig ? (
          <form>
            {Object.keys(selectedChartConfig.schema).map((key, index) => (
              <div key={index}>
                {renderFields(
                  selectedChartConfig.schema[key],
                  0,
                  handleChange,
                  key
                )}
              </div>
            ))}
          </form>
        ) : (
          <div>
            Hello, welcome to <b>UI Chart Helper</b> space 👾
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartControls;
