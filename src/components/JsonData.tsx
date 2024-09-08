import React, { useContext } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContext } from "@/context";
import { JsonEditor } from "json-edit-react";

const JsonData = () => {
  const { data, setData } = useContext(ChartContext)!;

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Chart Data</CardTitle>
      </CardHeader>
      <CardContent>
        <JsonEditor data={data} setData={setData} />
      </CardContent>
    </Card>
  );
};

export default JsonData;
