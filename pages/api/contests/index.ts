import { NextApiResponse, NextApiRequest } from "next";
import contestData from "../../../utils/sports.json";
import { ContestType, StatusType, ResponseError } from "../../../interfaces";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContestType[] | ResponseError>
) {
  try {
    const contests: ContestType[] = contestData as ContestType[];

    // Apply filters
    let filteredContests = contests;

    // Filter by status
    const statusFilter = req.query.status as string;
    if (statusFilter && ["finished", "canceled", "inprogress", "notstarted"].includes(statusFilter)) {
      filteredContests = contests.filter((contest) => contest.status.type === statusFilter);
    }

    // Search by contest name
    const searchQuery = req.query.search as string;
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filteredContests = filteredContests.filter((contest) =>
        contest.name.toLowerCase().includes(lowercasedQuery)
      );
    }

    return res.status(200).json(filteredContests);
  } catch (error) {
    const responseError: ResponseError = {
      status: 500,
      message: "Internal Server Error",
    };
    return res.status(responseError.status).json(responseError);
  }
}
