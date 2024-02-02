import { ContestType } from "@/interfaces";
import styled from "styled-components";


const Card = styled.div`
  border: 1px solid grey;
  border-radius: 8px;
  padding: 20px;
  width: 400px; /* Adjust the width of each card as needed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 1024px) {
    width: 300px
  }
`

export default function ContestCard({ contest }: { contest: ContestType }) {
  return (
      <Card>
        <p>{contest.name}</p>
      </Card>
  );
}