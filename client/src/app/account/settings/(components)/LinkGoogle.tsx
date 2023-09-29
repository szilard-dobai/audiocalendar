"use client";

import Button from "@/components/Button";
import useGrantGoogleAccess from "@/hooks/useGrantGoogleAccess";
import useRevokeGoogleAccess from "@/hooks/useRevokeGoogleAccess";
import Link from "next/link";

type Props = {
  isAccessGranted: boolean;
  className?: string;
};

const LinkGoogle = ({ isAccessGranted, className }: Props) => {
  const {
    mutate: grantAccess,
    isLoading: isGrantingAccess,
    error: errorGrantingAccess,
  } = useGrantGoogleAccess();
  const {
    mutate: revokeAccess,
    isLoading: isRevokingAccess,
    error: errorRevokingAccess,
  } = useRevokeGoogleAccess();

  const renderGrantAccess = () => (
    <>
      <p className="mb-3">
        Click the button below to grant{" "}
        <span className="font-semibold text-brand">Audiocalendar</span> access
        to your Google Calendar.
      </p>

      <Button
        className="ml-auto"
        variant="outline"
        image="google"
        disabled={isGrantingAccess}
        onClick={() => grantAccess()}
      >
        Authorize Google
      </Button>
      {!!errorGrantingAccess && (
        <p className="text-rose-500 italic">{errorGrantingAccess}</p>
      )}
    </>
  );

  const renderRevokeAccess = () => (
    <>
      <p className="mb-3">
        Click the button below to revoke Audiocalendar&apos;s access to your
        Google account. For extra security, go to your{" "}
        <Link
          href="https://myaccount.google.com/connections/"
          target="_blank"
          className="text-brand font-semibold hover:underline"
        >
          🔗 Account Settings
        </Link>{" "}
        and remove the app from there too.
      </p>

      <Button
        className="ml-auto"
        variant="outline"
        disabled={isRevokingAccess}
        onClick={() => revokeAccess()}
        image="google"
      >
        Revoke Access
      </Button>
      {!!errorRevokingAccess && (
        <p className="text-rose-500 italic">{errorRevokingAccess}</p>
      )}
    </>
  );

  return (
    <div className={className}>
      {isAccessGranted ? renderRevokeAccess() : renderGrantAccess()}
    </div>
  );
};

export default LinkGoogle;
