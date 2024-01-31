import { useRouter } from "next/router";
import useSWR from "swr";

import type { ContestType, ResponseError } from "@/interfaces";

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
}

export default function ContestPage() {
  const { query } = useRouter();
  const { data, error, isLoading, isValidating } = useSWR<
    ContestType,
    ResponseError
  >(() => (query.id ? `/api/contests/${query.id}` : null), fetcher);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <>
      {isValidating ? (<>
        <p>Validating...</p>
      </>) : (<>
        <p>{data.name}</p>
      </>)}
    </>
  )
}