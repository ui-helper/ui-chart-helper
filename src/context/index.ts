import { ChartControl, ChartData } from "@/types/chartTypes";
import { JsonData } from "json-edit-react";
import { createContext } from "react";

interface ChartProps {
  formData: ChartControl | null;
  setData: (data: JsonData) => void;
  data: ChartData;
}

export const ChartContext = createContext<ChartProps | null>(null);
