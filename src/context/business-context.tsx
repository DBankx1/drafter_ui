"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { Business } from "@/lib/types/business";

export type BusinessContextType = {
  business: Business | null;
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
};

const BusinessContext = createContext<BusinessContextType | undefined>(
  undefined,
);

export function BusinessProvider({
  children,
  initialBusiness,
  initialUser,
}: {
  readonly children: ReactNode;
  readonly initialBusiness: Business;
  readonly initialUser: {
    readonly name: string;
    readonly email: string;
    readonly avatar: string;
  };
}) {
  const value: BusinessContextType = useMemo(
    () => ({
      business: initialBusiness,
      user: initialUser,
    }),
    [initialBusiness, initialUser],
  );

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusinessContext() {
  const context = useContext(BusinessContext);

  if (context === undefined) {
    throw new Error(
      "useBusinessContext must be used inside a BusinessProvider",
    );
  }

  return context;
}
