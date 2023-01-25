import createUser from "../mutations/users/createUser/createUser";
import getUserByEmail from "../query/users/getUserByEmail/getUserByEmail";
import updateUser from "../mutations/users/updateUser/updateUser";
import deleteUser from "../mutations/admin/deleteUser/deleteUser";
import preRegisterUser from "../query/users/preRegisterUser/preRegisterUser";
import getAllUserInfo from "../query/admin/getAllUserInfo/getAllUserInfo";
import zkProfile from "../mutations/users/createProfile/createProfile";
import setUserName from "../mutations/users/setUserName/setUserName";
import addContacts from "../mutations/users/addContacts/addContacts";
import getAddressByUserName from "../query/users/getAddressByUserName/getAddressByUserName";

exports.handler = async (event: any, context: any) => {
  switch (event.info.fieldName) {
    case "createUser":
      return await preRegisterUser(event.arguments.user);

    case "getUserByEmail":
      // return "zohaib10092001@gmail.com"
      return await getUserByEmail(event.arguments.id);

    case "updateUser":
      return await updateUser(event.arguments.user);

    case "deleteUser":
      return await deleteUser(event.arguments.id);

    case "getAllUserInfo":
      return await getAllUserInfo();

    case "zkProfile":
      return await zkProfile(event.arguments.zkuser);

    case "setUserName":
      return await setUserName(event.arguments.setname);

    case "addContacts":
      return await addContacts(event.arguments.user);

    case "getAddressByUserName":
      return await getAddressByUserName(event.arguments.userName);

    default:
      return null;
  }
};
