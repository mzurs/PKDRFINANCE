import { NextApiRequest, NextApiResponse } from "next";

export interface Contact {
  id: number;
  username: string;
  email: string
}

//To be fetch from DynamoDB
const users: Contact[] = [
  { id: 1, username: "example1", email: "example@example.com" },
  { id: 2, username: "example2", email: "example@example.com" },
  { id: 3, username: "example3", email: "example@example.com" },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contact[]>
) {
  const searchTerm = req.query.searchTerm as string;

  const searchResults = await searchUsers(searchTerm);

  res.status(200).json(searchResults);
}

async function searchUsers(searchTerm: string): Promise<Contact[]> {
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredUsers;
}
