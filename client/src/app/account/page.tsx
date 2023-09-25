import AuthorizeGoogleButton from "./(components)/AuthorizeGoogleButton";
import AuthorizeSpotifyButton from "./(components)/AuthorizeSpotifyButton";
import Logout from "./(components)/LogoutButton";
import ManageAccount from "./(components)/ManageAccount";
import SongHistory from "./(components)/SongHistory";

const Account = async () => {
  return (
    <>
      <div className="flex justify-end gap-3 mb-6">
        <AuthorizeGoogleButton />
        <AuthorizeSpotifyButton />
        <Logout />
      </div>
      <ManageAccount />
      <SongHistory />
    </>
  );
};

export default Account;
