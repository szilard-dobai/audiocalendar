import { getCurrentUser } from "../me/getCurrentUser";
import ManageAccount from "./(components)/ManageAccount";
import { notFound } from "next/navigation";

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if ("error" in user) {
    notFound();
  }

  return <ManageAccount initialData={user} />;
};

export default SettingsPage;
