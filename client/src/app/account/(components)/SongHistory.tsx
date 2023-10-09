"use client";

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import useGetSongHistory from "@/hooks/useGetSongHistory";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SongCalendar from "./SongCalendar";

const PAGE_SIZE = 20;

const SongHistory = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetSongHistory(page, PAGE_SIZE);
  const maximumPage = data?.count ? Math.ceil(data.count / PAGE_SIZE) : 0;
  const showPagination = maximumPage > 1;

  return (
    <>
      <SongCalendar />

      <div className="flex items-baseline justify-between mb-1 gap-3">
        <h1 className="font-semibold text-2xl">Song History</h1>
        {showPagination && (
          <p>
            Page {page} of {maximumPage}
          </p>
        )}
      </div>

      {showPagination && (
        <div className="flex items-center justify-end gap-3 mb-6">
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
      )}

      {isLoading ? (
        <Loader />
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
              <Link
                className="hover:font-semibold cursor-pointer"
                href={el.songUrl}
                target="_blank"
              >
                {el.artist} - {el.song} ({el.album})
              </Link>
            </p>
            {el.songPreviewUrl && <audio src={el.songPreviewUrl} controls />}
          </div>
        ))
      )}
    </>
  );
};

export default SongHistory;
