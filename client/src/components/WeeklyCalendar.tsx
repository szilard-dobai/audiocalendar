import { useIsMobile } from "@/hooks/useIsMobile";
import { inter } from "@/utils/client/fonts";
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

    const { artist, song } = data[params.dataIndex];
    const name = `${artist} - ${song}`;

    const day = api.value(0);
    const startValue = api.value(1);
    const startCoords = api.coord([day, startValue]);
    const endValue = api.value(2);
    const endCoords = api.coord([day, endValue]);

    const size = api.size([0, 1]) as number[];
    const width = size[0] * 0.9;

    const textXPadding = isMobile ? 4 : 8;

    const shape = graphic.clipRectByRect(
      {
        x: startCoords[0] - width / 2,
        y: startCoords[1],
        width: width,
        height: endCoords[1] - startCoords[1],
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      }
    );

    return (
      shape && {
        type: "group",
        children: [
          {
            type: "rect",
            transition: ["shape"],
            shape: { ...shape, r: 10 },
            style: api.style({
              stroke: "white",
              lineWidth: 1,
            }),
          },
          {
            type: "text",
            style: {
              x: shape.x + textXPadding,
              y: shape.y + shape.height * 0.5,
              verticalAlign: "middle",
              text: name,
              fontFamily: inter.style.fontFamily,
              fill: "#fff",
              textShadowColor: "black",
              textShadowBlur: 2,
              width: width - textXPadding,
              height: shape.height,
              overflow: "truncate",
              ellipsis: "..",
              truncateMinChar: 1,
            },
          },
        ],
      }
    );
  };

  const formatTooltip = (item: CallbackDataParams) => {
    const { albumImage, album, artist, song, songUrl, songPreviewUrl } =
      data[item.dataIndex];
    const [_, startedAt, endedAt] = item.value as number[];

    return `
    <div class="flex flex-row items-center gap-3 pointer-events-auto max-w-lg whitespace-normal">
      <img src="${albumImage}" height="100px" width="100px" alt="${album}" style="border: 1px solid ${
      item.color
    }"/>
      <div>
          <p>${dayjs.utc(startedAt).format("HH:mm")} - ${dayjs
      .utc(endedAt)
      .format("HH:mm")}</p>
          <p class="text-lg font-semibold" style="color: ${
            item.color
          }">${artist} - ${song}</p>
          <a class="cursor-pointer hover:underline" href="${songUrl}" target="_blank">Listen on Spotify</a>
          ${songPreviewUrl ? `<audio src="${songPreviewUrl}" controls />` : ""}
          </div>
    </div>
      `;
  };

  return (
    <ReactEcharts
      style={{ height: "800px" }}
      options={{
        tooltip: {
          triggerOn: "click",
          confine: true,
        },
        dataZoom: [
          {
            type: "slider",
            filterMode: "filter",
            brushSelect: false,
            left: 0,
            width: 10,
            orient: "vertical",
            minValueSpan: ONE_HOUR,
            maxValueSpan: 5 * ONE_HOUR,
            startValue: 12 * ONE_HOUR,
            endValue: 15 * ONE_HOUR,
            labelFormatter: "",
            handleSize: 0,
            fillerColor: "#17bf3e",
            borderColor: "#17bf3e",
          },
          {
            type: "inside",
            orient: "vertical",
          },
        ],
        grid: {
          top: 60,
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
            lineStyle: {
              color: "#ecf0ff",
            },
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
            lineStyle: {
              color: "#ecf0ff",
            },
          },
          axisLabel: {
            interval: 0,
            formatter: (value) => {
              const day = isMobile ? "ddd" : "dddd";
              const isToday = dayjs(value).isSame(dayjs(), "day");

              return dayjs(value)
                .format(`${day}[\n{${isToday ? "today" : "date"}|]D}`)
                .toUpperCase();
            },
            color: "#2f2e41",
            rich: {
              TODAY: {
                fontSize: 24,
                lineHeight: 36,
                color: "#17bf3e",
              },
              DATE: {
                fontSize: 24,
                lineHeight: 36,
              },
            },
          },
        },
        textStyle: {
          fontFamily: inter.style.fontFamily,
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
              formatter: formatTooltip,
            },
          },
        ],
      }}
    />
  );
};

export default WeeklyCalendar;
