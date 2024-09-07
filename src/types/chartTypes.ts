export enum ColorType {
  HEX = "hex",
}

export enum AlignmentType {
  SELECT = "alignment_select",
  RADIO = "alignment_radio",
}

export interface ChartStyle {
  fillColor: {
    type: ColorType.HEX;
    defaultValue: string;
  };
  label: {
    color: {
      type: ColorType.HEX;
      defaultValue: string;
    };
    fontSize: {
      type: "number";
      defaultValue: number;
    };
  };
  stroke: {
    color: {
      type: ColorType.HEX;
      defaultValue: string;
    };
    width: {
      type: "number";
      defaultValue: number;
    };
  };
}

export interface TitleStyle {
  fontSize: {
    type: "number";
    defaultValue: number;
  };
  color: {
    type: ColorType.HEX;
    defaultValue: string;
  };
  alignment: {
    type: AlignmentType;
    options: ("left" | "center" | "right")[];
    defaultValue: "left" | "center" | "right";
  };
}

export interface ChartControl {
  chartStyle?: ChartStyle;
  title: {
    content: {
      type: "string";
      defaultValue: string;
    };
    style: TitleStyle;
  };
}

export interface ChartConfig {
  id: number;
  name: string;
  description: string;
  schema: ChartControl[];
}

export interface ChartConfiguration {
  selectedChartId: number;
  configuredValues: {
    chartStyle?: {
      fillColor: string;
      label: {
        color: string;
        fontSize: number;
      };
      stroke: {
        color: string;
        width: number;
      };
    };
    title: {
      content: string;
      style: {
        fontSize: number;
        color: string;
        alignment: "left" | "center" | "right";
      };
    };
  };
}
