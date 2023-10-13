import { useIsMobile } from "@/hooks/useIsMobile";
import type { Database } from "@audiocalendar/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemReturn,
  SeriesOption,
} from "echarts";
import { graphic } from "echarts";
import ReactEcharts from "./ReactEcharts";

type Song = Database["public"]["Tables"]["history"]["Row"];

type Props = { data: Song[]; startTimestamp: string };

dayjs.extend(utc);

const WeeklyCalendar = ({ data = [], startTimestamp }: Props) => {
  const isMobile = useIsMobile();
  const timeRef = dayjs(0); //.startOf("day");

  const groupedByWeekday = data?.reduce<Record<string, Song[]>>((acc, el) => {
    const key = dayjs(el.playedAt).format("dddd\nMMMM DD");
    if (acc[key]) {
      acc[key].push(el);
    } else {
      acc[key] = [];
    }
    return acc;
  }, {});

  const xAxisData = [0, 1, 2, 3, 4, 5, 6].map((index) =>
    dayjs(startTimestamp).add(index, "day").toISOString()
  );
  console.log(xAxisData.map((e) => dayjs(e).toISOString()));
  const renderItem = (
    params: any,
    api: CustomSeriesRenderItemAPI
  ): CustomSeriesRenderItemReturn => {
    var categoryIndex = api.value(0);
    var name = data[params.dataIndex].song;
    var start = api.coord([categoryIndex, api.value(1)]);
    var end = api.coord([categoryIndex, api.value(2)]);
    var width = api.size!([0, 1])[0] * 0.9;
    var rectShape = graphic.clipRectByRect(
      {
        x: start[0] - width / 2,
        y: start[1],
        width: width,
        height: end[1] - start[1],
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      }
    );
    return (
      rectShape && {
        type: "group",
        children: [
          {
            type: "rect",
            transition: ["shape"],
            shape: { ...rectShape, r: 10 },
            // textContent: {
            //   style: {
            //     text: name,
            //     fontFamily: 'Verdana',
            //     fill: '#000',
            //     width: width - 4,
            //     overflow: 'truncate',
            //     ellipsis: '..',
            //     truncateMinChar: 1
            //   },
            //   emphasis: {
            //     style: {
            //       stroke: '#000',
            //       lineWidth: 0.5
            //     }
            //   }
            // },
            // textConfig: {
            //   position: 'insideRight'
            // },
            style: api.style({
              stroke: "white",
              lineWidth: 2,
              opacity: 1,
            }),
          },
          {
            type: "image",
            style: {
              image:
                "https://audiocalendar.app/_next/image?url=https%3A%2F%2Fi.scdn.co%2Fimage%2Fab67616d0000b273f4021229806dee1ed58835d2&w=128&q=75",
              x: rectShape.x + rectShape.width * 0.1,
              y:
                rectShape.y +
                rectShape.height * 0.5 -
                Math.min(rectShape.height * 0.6, rectShape.width * 0.6) / 2,
              height: Math.min(rectShape.height * 0.6, rectShape.width * 0.6),
            },
            textContent: {
              type: "text",
              style: {
                text: name,
                fontFamily: "Verdana",
                fill: "#000",
                width: width - 4,
                overflow: "truncate",
                ellipsis: "..",
                truncateMinChar: 1,
              },
              emphasis: {
                style: {
                  stroke: "#000",
                  lineWidth: 0.5,
                },
              },
            },
            textConfig: {
              position: "insideRight",
              layoutRect: rectShape,
            },
          },
        ],
      }
    );
  };

  const getTime = (date: string) =>
    dayjs(date).diff(dayjs(date).startOf("day")).valueOf();

  const transformData = (): SeriesOption["data"] => {
    // console.log(data);
    return data.map((el) => {
      //   console.log(el.song, el.playedAt, getTime(el.playedAt));
      return {
        name: el.song,
        value: [
          dayjs(el.playedAt).isoWeekday() - 1,
          getTime(el.playedAt),
          getTime(el.playedAt) + el.songDuration,
          el.songDuration,
        ],
      };
    });
  };

  return (
    <>
      <ReactEcharts
        lazyUpdate
        style={{ height: "100vh" }}
        options={{
          // tooltip: {
          //   formatter: function (params) {
          //     return (
          //       params.marker +
          //       params.name +
          //       ": " +
          //       params.value[3] / 1000 / 3600 +
          //       " h"
          //     );
          //   },
          // },
          dataZoom: [
            {
              type: "slider",
              filterMode: "weakFilter",
              // showDataShadow: false,
              left: 0,
              width: 10,
              orient: "vertical",
              minValueSpan: 3600 * 1 * 1000 * 1,
              startValue: 10 * 3600 * 1000,
              endValue: 20 * 3600 * 1000,
              labelFormatter: "",
            },
            {
              type: "inside",
              orient: "vertical",

              // minValueSpan: 360000000,
              // filterMode: 'weakFilter'
            },
          ],
          grid: {
            top: 40,
            left: 60,
            bottom: 10,
            right: 25,
          },
          yAxis: {
            min: timeRef.valueOf(),
            max: timeRef.add(1, "day").valueOf(),
            type: "time",
            inverse: true,
            axisLabel: {
              formatter: (val) => dayjs.utc(val).format("HH:mm"),
            },
            splitLine: {
              show: true,
            },
          },
          xAxis: {
            type: "category",
            data: xAxisData,
            position: "top",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
            },
            axisLabel: {
              interval: 0,
              formatter: (value) =>
                dayjs(value).format(
                  isMobile ? "ddd[\n{date|]D}" : "dddd[\n{date|]D}"
                ),
              rich: {
                date: {
                  fontSize: 20,
                  fontWeight: "bold",
                },
              },
            },
          },
          //   tooltip: {
          //     formatter: (param) => {
          //       const item = param as CallbackDataParams;
          //       return `${dayjs(data[item.dataIndex].playedAt).format(
          //         "HH:mm"
          //       )}, ${dayjs(data[item.dataIndex].playedAt).isoWeekday()}`;
          //     },
          //   },
          series: [
            {
              type: "custom",
              renderItem: renderItem,
              itemStyle: {
                opacity: 0.8,
              },
              encode: {
                y: [1, 2],
                x: 0,
              },
              data: transformData(),
            },
          ],
        }}
      />
    </>
  );
};

export default WeeklyCalendar;
