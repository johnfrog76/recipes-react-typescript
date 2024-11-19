import { iUser } from "../../interfaces/user/user.interface";

export type StoredAuthType = {
  user: iUser;
  expires: number;
};

export const setUserAuth = (user: iUser, expires: number): void => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      user,
      expires,
    })
  );
};

export const getRemainingTime = () => {
  const data: string | null = localStorage.getItem("userData");

  if (data) {
    const authData: StoredAuthType = JSON.parse(data);
    const { expires } = authData;
    const currentTime = new Date().getTime();
    const remaining = expires - currentTime;
    return remaining > 0 ? remaining : 0;
  }

  return 0;
};

export const expireAuth = () => {
  const data: string | null = localStorage.getItem("userData");

  if (data) {
    const authData: StoredAuthType = JSON.parse(data);
    const { expires } = authData;
    const currentTime = new Date().getTime();
    if (expires - currentTime < 0) {
      localStorage.removeItem("userData");
    }
  } else {
    localStorage.removeItem("userData");
  }
};

export const getUserAuth = () => {
  const data: string | null = localStorage.getItem("userData");

  if (data) {
    const authData: StoredAuthType = JSON.parse(data);
    const { expires } = authData;
    const currentTime = new Date().getTime();
    return expires - currentTime > 0 ? authData : null;
  } else {
    return null;
  }
};
