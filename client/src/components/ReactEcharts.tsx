"use client";

import type { EChartsOption } from "echarts";
import type { EChartsReactProps } from "echarts-for-react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { CustomChart } from "echarts/charts";
import {
  DataZoomComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CustomChart,
  DataZoomComponent,
  CanvasRenderer,
]);

interface Props extends Omit<EChartsReactProps, "option"> {
  options: EChartsOption;
}

const ReactEcharts = ({ options, ...props }: Props) => (
  <ReactEChartsCore {...props} echarts={echarts} option={options} />
);

export default ReactEcharts;
