export enum ColorType {
  HEX = "hex",
}
export enum AlignmentType {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

export enum AlignmentControlType {
  SELECT = "alignment_select",
  RADIO = "alignment_radio",
}

export enum ChartType {
  BAR = "bar",
  PIE = "pie",
  LINE = "line",
}

export interface ChartStyle {
  fillColor: {
    type: ColorType.HEX;
    value: string;
  };
  label: {
    color: {
      type: ColorType.HEX;
      value: string;
    };
    fontSize: {
      type: "number";
      value: number;
    };
  };
  stroke: {
    color: {
      type: ColorType.HEX;
      value: string;
    };
    width: {
      type: "number";
      value: number;
    };
  };
}

export interface TitleStyle {
  fontSize: {
    type: "number";
    value: number;
  };
  color: {
    type: ColorType.HEX;
    value: string;
  };
  alignment: {
    type: AlignmentControlType;
    options: AlignmentControlType[];
    value: AlignmentControlType;
  };
}

export interface ChartControl {
  [key: string]: any; // 인덱스 시그니처 추가
  chartStyle: {
    fillColor: {
      type: "hex";
      value: string;
    };
    label: {
      color: {
        type: "hex";
        value: string;
      };
      fontSize: {
        type: "number";
        value: number;
      };
    };
    stroke: {
      color: {
        type: "hex";
        value: string;
      };
      width: {
        type: "number";
        value: number;
      };
    };
  };
  title: {
    content: {
      type: "string";
      value: string;
    };
    style: {
      fontSize: {
        type: "number";
        value: number;
      };
      color: {
        type: "hex";
        value: string;
      };
      alignment: {
        type: AlignmentControlType;
        options: AlignmentControlType[];
        value: AlignmentControlType;
      };
    };
  };
}

export interface ChartConfig {
  id: number;
  name: string;
  description: string;
  chartType: ChartType;
  schema: ChartControl;
}

type DataPoint = Record<string, number>;

export type ChartData = DataPoint[];
