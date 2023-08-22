import { PortalPageTitle } from "@/lib/hooks/PortalPageTitle";
import AccountForm from "@/ui/Sections/Account";
import React, { Suspense } from "react";
async function AccountPage() {
  return (
    <section className="w-full h-full mx-auto relative">
      <div className="relative ">
        <PortalPageTitle title="Account Settings" toolTip="Get ya mind right" />
      </div>
      <div className="relative flex  min-h-full mx-auto w-full">
        <Suspense>
        <AccountForm />
        </Suspense>
      </div>
    </section>
  );
}

export default AccountPage;
