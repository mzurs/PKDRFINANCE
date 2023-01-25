import createUser from "../mutations/createUser";
import getUserByEmail from "../query/getUserByEmail";
import User from "../types/types_user/types_user";

exports.handler = async (event: any, context: any) => {
  switch (event.info.fieldName) {
    case "createUser":
      const message: string = "\n Already Exists \n";
      return typeof (await getUserByEmail(event.arguments.user.id)) ==
        "undefined"
        ? await createUser(event.arguments.user)
        : message;

    case "getUserByEmail":
      return await getUserByEmail(event.arguments.id);

    default:
      return null;
  }
};
