"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSetQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    updates: Record<string, string | number | null | undefined>,
    options?: { replace?: boolean }
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key); // remove key if null/undefined/empty string
      } else {
        params.set(key, String(value));
      }
    });

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (options?.replace) {
      router.replace(url);
      return;
    }

    router.push(url);
  };
}
