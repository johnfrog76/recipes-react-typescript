import { iUserItem } from "../../interfaces/users/users.interface";

export const addUserItem = (user:iUserItem, userList: iUserItem[]):iUserItem[] => {
   userList.push(user);
   const sorted = userList.sort(
      (a: iUserItem, b: iUserItem) => (
          a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
      ));
   return sorted;
}

export const removeUserItem = (user:iUserItem, userList: iUserItem[]):iUserItem[] => {
   const idx = userList.findIndex(u => u.id === user.id);
   userList.splice(idx, 1);
   return userList;
}

