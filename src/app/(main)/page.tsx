"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { ChartConfig, ChartControl, ChartData } from "@/types/chartTypes";
import chartConfig from "@/config/chartConfig.json";
import chartData2 from "@/data/chartData2.json";
import CodeViewer from "@/components/CodeViewer";
import ChartSelector from "@/components/ChartSelector";
import ChartControls from "@/components/ChartControls";
import ChartArea from "@/components/ChartArea";
import { ChartContext } from "@/context";
import JsonDataEditor from "@/components/JsonData";
import type { JsonData } from "json-edit-react";

export default function Main() {
  const [selectedChartId, setSelectedChartId] = useState<number>(1);

  const [formData, setFormData] = useState<ChartControl | null>(null);

  const [chartData, setChartData] = useState<ChartData | JsonData>(chartData2);

  const selectedChartConfig = (chartConfig as ChartConfig[]).find(
    (chart) => chart.id === selectedChartId
  );

  useEffect(() => {
    if (selectedChartConfig) {
      const initialFormData = { ...selectedChartConfig.schema };
      setFormData(initialFormData);
    }
  }, [selectedChartConfig]);

  const handleChange = (key: string, newValue: any) => {
    setFormData((prevData) => {
      if (!prevData) return prevData;

      const keys = key.split(".");
      let current = { ...prevData };
      let temp: any = current;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!temp[keys[i]]) {
          temp[keys[i]] = {};
        } else {
          temp[keys[i]] = { ...temp[keys[i]] };
        }
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] = {
        ...temp[keys[keys.length - 1]],
        value: newValue,
      };

      return current as ChartControl;
    });
  };

  return (
    <ChartContext.Provider
      value={{
        formData,
        data: chartData as ChartData,
        setData: (data) => setChartData(data),
      }}
    >
      <div className="flex flex-col min-h-screen w-full">
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6">
          <div className="flex flex-col gap-6">
            <ChartSelector
              chartConfig={chartConfig as ChartConfig[]}
              selectedChartId={selectedChartId}
              setSelectedChartId={setSelectedChartId}
            />
            <div className="text-gray-700">
              {selectedChartConfig?.description}
            </div>
            <div className="grid gap-4">
              <ChartControls
                selectedChartConfig={selectedChartConfig}
                handleChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <ChartArea
              selectedChartConfig={selectedChartConfig}
              formData={formData}
              chartData={chartData as ChartData}
            />
            <Tabs defaultValue="code">
              <TabsList>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>
              <TabsContent value="code">
                <CodeViewer />
              </TabsContent>
              <TabsContent value="data">
                <JsonDataEditor />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ChartContext.Provider>
  );
}
