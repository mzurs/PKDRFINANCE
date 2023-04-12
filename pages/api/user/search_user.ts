import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: any,
  res: any
) {
  if (req.method === "POST") {
    const users: any = JSON.parse(req.headers["x-custom-header"]);
    console.log("USERS = " + users);

    const searchTerm = req.query.searchTerm as string;

    const searchResults = await searchUsers(searchTerm, users);

    res.status(200).json(searchResults);
  }
}

async function searchUsers(searchTerm: string, users: string[]): Promise<string[]> {
  const filteredUsers = users.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredUsers;
}
