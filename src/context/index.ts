import { ChartControl, ChartData } from "@/types/chartTypes";
import { createContext } from "react";

interface ChartProps {
  formData: ChartControl | null;
  data: ChartData;
}

export const ChartContext = createContext<ChartProps | null>(null);
