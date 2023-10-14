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
import type { CallbackDataParams } from "echarts/types/dist/shared";
import ReactEcharts from "./ReactEcharts";

type Song = Database["public"]["Tables"]["history"]["Row"];

type Props = { data: Song[]; startTimestamp: string };

dayjs.extend(utc);

const ONE_HOUR = 3600 * 1000;

const WeeklyCalendar = ({ data = [], startTimestamp }: Props) => {
  const isMobile = useIsMobile();
  const timeRef = dayjs(0);

  //   const groupedByWeekday = data?.reduce<Record<string, Song[]>>((acc, el) => {
  //     const key = dayjs(el.playedAt).format("dddd\nMMMM DD");
  //     if (acc[key]) {
  //       acc[key].push(el);
  //     } else {
  //       acc[key] = [];
  //     }
  //     return acc;
  //   }, {});

  const xAxisData = [0, 1, 2, 3, 4, 5, 6].map((index) =>
    dayjs(startTimestamp).add(index, "day").toISOString()
  );

  const getTime = (date: string) =>
    dayjs(date).diff(dayjs(date).startOf("day")).valueOf();

  const transformData = (): SeriesOption["data"] => {
    return data.map((el) => {
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

  const renderItem = (
    params: any,
    api: CustomSeriesRenderItemAPI
  ): CustomSeriesRenderItemReturn => {
    if (!api.size) {
      // NOTE: This is badly typed...
      return;
    }

    const categoryIndex = api.value(0);
    const name = data[params.dataIndex].song;
    const start = api.coord([categoryIndex, api.value(1)]);
    const end = api.coord([categoryIndex, api.value(2)]);
    const size = api.size([0, 1]) as number[];
    const width = size[0] * 0.9;
    const rectShape = graphic.clipRectByRect(
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

  return (
    <>
      <ReactEcharts
        lazyUpdate
        style={{ height: "100vh" }}
        options={{
          tooltip: {
            triggerOn: "click",
            confine: true,
          },
          dataZoom: [
            {
              type: "slider",
              filterMode: "weakFilter",
              // showDataShadow: false,
              left: 0,
              width: 10,
              orient: "vertical",
              minValueSpan: ONE_HOUR,
              startValue: 10 * ONE_HOUR,
              endValue: 20 * ONE_HOUR,
              labelFormatter: "",
            },
            {
              type: "inside",
              orient: "vertical",
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
          series: [
            {
              type: "custom",
              renderItem: renderItem,
              encode: {
                y: [1, 2],
                x: 0,
              },
              data: transformData(),
              colorBy: "data",
              tooltip: {
                formatter: (params) => {
                  const item = params as CallbackDataParams;
                  const dataPoint = data[item.dataIndex];
                  const [_, startedAt, endedAt] = item.value as number[];

                  return `
                  <div class="flex flex-row items-center gap-3 pointer-events-auto max-w-lg whitespace-normal">
                    <img src="${
                      dataPoint.albumImage
                    }" height="100px" width="100px" alt="${
                    dataPoint.album
                  }" style="border: 1px solid ${item.color}"/>
                    <div>
                        <p>${dayjs.utc(startedAt).format("HH:mm")} - ${dayjs
                    .utc(endedAt)
                    .format("HH:mm")}</p>
                        <p class="text-lg font-semibold" style="color: ${
                          item.color
                        }">${dataPoint.artist} - ${dataPoint.song}</p>
                        <a class="cursor-pointer hover:underline" href="${
                          dataPoint.songUrl
                        }" target="_blank">Listen on Spotify</a>
                        ${
                          dataPoint.songPreviewUrl
                            ? `<audio src="${dataPoint.songPreviewUrl}" controls />`
                            : ""
                        }
                        </div>
                  </div>
                    `;
                },
              },
            },
          ],
        }}
      />
    </>
  );
};

export default WeeklyCalendar;
