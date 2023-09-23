import AuthorizeGoogleButton from "./(components)/AuthorizeGoogleButton";
import AuthorizeSpotifyButton from "./(components)/AuthorizeSpotifyButton";
import SongHistory from "./(components)/SongHistory";

const Account = async () => {
  return (
    <>
      Account page
      <AuthorizeGoogleButton />
      <AuthorizeSpotifyButton />
      <SongHistory />
    </>
  );
};

export default Account;
