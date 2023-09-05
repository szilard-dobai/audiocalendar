import { useContext } from "react";
import { SpotifyContext } from "../components/SpotifyProvider";

export const useSpotify = () => {
  const spotify = useContext(SpotifyContext);
  if (!spotify) {
    throw new Error("User not logged in!");
  }
  return spotify;
};
