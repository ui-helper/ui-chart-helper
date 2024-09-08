"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { ChartConfig, ChartControl } from "@/types/chartTypes";
import chartConfig from "@/config/chartConfig.json";
// import chartData1 from "@/data/chartData1.json";
import chartData2 from "@/data/chartData2.json";
import CodeViewer from "@/components/CodeViewer";
import ChartComponent from "@/components/ChartComponent";
import renderFields from "@/components/renderFields";

export default function Main() {
  const [selectedChartId, setSelectedChartId] = useState<number>(1);
  const [formData, setFormData] = useState<ChartControl | null>(null);

  const selectedChartConfig = (chartConfig as ChartConfig[]).find(
    (chart) => chart.id === selectedChartId
  );

  useEffect(() => {
    setFormData(null);
    if (selectedChartConfig && formData) {
      const updatedSchema = { ...selectedChartConfig.schema };
      Object.keys(formData).forEach((key) => {
        const keys = key.split(".");
        let current = updatedSchema;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        const lastKey = keys[keys.length - 1];
        if (
          current[lastKey] &&
          current[lastKey].value !== formData[key].value
        ) {
          current[lastKey].value = formData[key].value;
        }
      });
      setFormData(updatedSchema);
    }
  }, [selectedChartConfig]);

  const handleChange = (key: string, newValue: any) => {
    setFormData((prevData) => {
      if (!prevData) return prevData;

      const keys = key.split(".");
      let current = { ...prevData };
      let temp = current;
      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = { ...temp[keys[i]] };
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = {
        ...temp[keys[keys.length - 1]],
        value: newValue,
      };
      return current;
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6">
        <div className="flex flex-col gap-6">
          <div className="h-30">
            <Select
              defaultValue="1"
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
          <div className="text-gray-700">
            {selectedChartConfig?.description}
          </div>
          <div className="grid gap-4">
            <Card className="shadow-lg rounded-lg">
              <CardHeader className="bg-gray-800 text-white p-4 rounded-t-lg">
                <CardTitle>Controls</CardTitle>
              </CardHeader>
              <CardContent className="p-4 bg-white rounded-b-lg">
                {selectedChartConfig ? (
                  <form>
                    {Object.keys(selectedChartConfig.schema).map(
                      (key, index) => (
                        <div key={index}>
                          {renderFields(
                            selectedChartConfig.schema[key],
                            0,
                            handleChange,
                            key
                          )}
                        </div>
                      )
                    )}
                  </form>
                ) : (
                  <div>
                    Hello, welcome to <b>UI Chart Helper</b> space 👾
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="h-[500px] bg-muted p-2 rounded-md">
            Chart Area
            {selectedChartConfig && formData && (
              <ChartComponent
                config={selectedChartConfig}
                data={chartData2}
                formData={formData}
              />
            )}
          </div>
          <Tabs defaultValue="code">
            <TabsList>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <CodeViewer />
            </TabsContent>
            <TabsContent value="data">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>JSON Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="overflow-auto p-4 bg-muted rounded-md">
                    {JSON.stringify(chartData2, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
