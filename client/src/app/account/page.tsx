import AuthorizeGoogleButton from "./(components)/AuthorizeGoogleButton";
import AuthorizeSpotifyButton from "./(components)/AuthorizeSpotifyButton";
import SongHistory from "./(components)/SongHistory";

const Account = async () => {
  return (
    <>
      <div className="flex justify-end gap-3 mb-6">
        <AuthorizeGoogleButton />
        <AuthorizeSpotifyButton />
      </div>
      <SongHistory />
    </>
  );
};

export default Account;
