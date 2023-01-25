import { User } from "aws-cdk-lib/aws-iam";

type UserMessage = {
  id: string;
  cnic: string;
  user_check_enum: string;
  userName?: string | null;
};
export default UserMessage;
