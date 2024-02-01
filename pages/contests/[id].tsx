import { useRouter } from "next/router";
import useSWR from "swr";

import type { ContestType, ResponseError } from "@/interfaces";
import { Container } from "@/components/sharedstyles";
import { CountryName, MatchName, ScoreText, StatusText, VersusInfo, TeamName, ContestMain, StatusMetor, LiveStatusText } from "@/components/conteststyles";

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
      <Container>
        <ContestMain>
          {isValidating ? (<>
            <p>Validating...</p>
          </>) : (<>
            <CountryName>
              {data.country}
            </CountryName>
            <MatchName>
              {data.name}
            </MatchName>
            <StatusText>{data.status.type}</StatusText>
            <ScoreText>
              {data.homeScore.current} - {data.awayScore.current}
            </ScoreText>
            <VersusInfo>
              <TeamName>{data.homeTeam.name}</TeamName>
              <StatusMetor>
                <LiveStatusText>{data.liveStatus}</LiveStatusText>
              </StatusMetor>
              <TeamName>{data.awayTeam.name}</TeamName>
            </VersusInfo>
          </>)}
        </ContestMain>
      </Container>
    </>
  )
}