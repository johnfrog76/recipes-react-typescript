import { iUserItem } from "../../interfaces/users/users.interface";

export const addUserItem = (user:iUserItem, userList: iUserItem[]):iUserItem[] => {
   userList.push(user);
   return userList
}