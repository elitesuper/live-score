import useSWR from "swr";
import React from 'react';
import { ContestBody, ContestContainer, ContestHeader } from "@/components/conteststyles";
import { Title } from "@/components/sharedstyles";
import { ContestType } from "@/interfaces";
import ContestCard from "@/components/contestcard";

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Contests() {
  const { data, error, isLoading } = useSWR<ContestType[]>("/api/contests", fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <ContestContainer>
      <ContestHeader>
        <Title>Contests</Title>
      </ContestHeader>
      <ContestBody>
        {data.map((c) => (
          <React.Fragment key={c.id}>
            <ContestCard contest={c}></ContestCard>
          </React.Fragment>
        ))}
      </ContestBody>
    </ContestContainer>
  )
}