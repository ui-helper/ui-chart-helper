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
import { useState } from "react";
import { ChartConfig, ChartConfiguration } from "@/types/chartTypes";
import chartSchema from "@/config/chartSchema.json";
import renderFields from "@/components/renderFields";
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme } from "victory";
import chartData1 from "@/data/chartData1.json";
import chartData2 from "@/data/chartData2.json";
import CodeViewer from "@/components/CodeViewer";

// TODO: server component 로 metadata 처리 vs using useState
// export const metadata = {
//   title: "Home",
// };

export default function Main() {
  const [selectedChartId, setSelectedChartId] = useState<number | null>(null);
  const selectedChartSchema = (chartSchema as ChartConfig[]).find(
    (chart) => chart.id === selectedChartId
  );

  const configuredValues: ChartConfiguration["configuredValues"] | null = null;

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6">
        <div className="flex flex-col gap-6">
          <div className="h-30">
            <Select
              onValueChange={(value) => setSelectedChartId(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                {chartSchema.map((chart) => (
                  <SelectItem key={chart.id} value={String(chart.id)}>
                    {chart.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-gray-700">
            {selectedChartSchema?.description}
          </div>
          <div className="grid gap-4">
            <Card className="shadow-lg rounded-lg">
              <CardHeader className="bg-gray-800 text-white p-4 rounded-t-lg">
                <CardTitle>Controls</CardTitle>
              </CardHeader>
              <CardContent className="p-4 bg-white rounded-b-lg">
                {selectedChartSchema ? (
                  <form>
                    {selectedChartSchema.schema.map((control, index) => (
                      <div key={index}>{renderFields(control)}</div>
                    ))}
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
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryBar data={chartData2} />
            </VictoryChart>
            {/* <VictoryPie data={chartData2} /> */}
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
