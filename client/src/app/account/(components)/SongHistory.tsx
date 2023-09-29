"use client";

import Button from "@/components/Button";
import useGetSongHistory from "@/hooks/useGetSongHistory";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
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
          {!!data?.count && (
            <p>
              Page {page} of {maximumPage}
            </p>
          )}
          <Button
            disabled={page === 1 || isFetching || isLoading}
            onClick={() => setPage((page) => Math.max(page - 1, 1))}
          >
            Previous Page
          </Button>
          <Button
            disabled={
              !maximumPage || page === maximumPage || isFetching || isLoading
            }
            onClick={() => setPage((page) => page + 1)}
          >
            Next Page
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading ...</p>
      ) : !data?.songs?.length ? (
        <p>
          Nothing here yet! Make sure you connected your{" "}
          <Link
            href="/account/settings"
            className="text-brand font-semibold cursor-pointer hover:underline"
          >
            Spotify account
          </Link>{" "}
          and that you have listened to some music since then.
        </p>
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
