import { deAuthenticate, authenticate, restoreAuthState } from "./auth-slice";
import { AppDispatch, RootState } from "./store";
import { deleteCookie } from "cookies-next";

export const loginUser = (token: any) => async (dispatch: AppDispatch) => {
  dispatch(authenticate(token));
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  // localStorage.removeItem("token");
  deleteCookie("token");
  dispatch(deAuthenticate());
};

export const checkLogin = (token: any) => async (dispatch: AppDispatch) => {
  dispatch(restoreAuthState(token));
};
