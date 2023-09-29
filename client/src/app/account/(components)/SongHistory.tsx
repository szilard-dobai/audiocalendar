"use client";

import Button from "@/components/Button";
import useGetSongHistory from "@/hooks/useGetSongHistory";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

const PAGE_SIZE = 20;

const SongHistory = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetSongHistory(page, PAGE_SIZE);
  const maximumPage = data?.count ? Math.ceil(data.count / PAGE_SIZE) : 0;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold text-2xl">Song History</h1>
        <div className="flex items-center gap-3">
          <p>
            Page {page} {data?.count && `of ${maximumPage}`}
          </p>
          <Button
            disabled={page === 1}
            onClick={() => setPage((page) => Math.max(page - 1, 1))}
          >
            Previous Page
          </Button>
          <Button
            disabled={page === maximumPage}
            onClick={() => setPage((page) => page + 1)}
          >
            Next Page
          </Button>
          {isFetching && <p>... fetching more ...</p>}
        </div>
      </div>

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        data?.songs?.map((el) => (
          <div key={el.id} className="border-b pb-4 mb-4">
            <p className="mb-3">
              <span className="font-semibold">
                {dayjs(el.playedAt).format("dddd, DD/MM/YYYY, [at] HH:mm")}
              </span>
              <Image
                src={el.albumImage}
                width={100}
                height={100}
                className="border"
                alt={`${el.artist} -  ${el.album}`}
              />
              <span>
                {el.artist} - {el.song} ({el.album})
              </span>
            </p>
            {el.songPreviewUrl && <audio src={el.songPreviewUrl} controls />}
          </div>
        ))
      )}
    </>
  );
};

export default SongHistory;
