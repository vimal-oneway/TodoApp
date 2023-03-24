import { success, failed, request, logout  } from "../slice/user.slice";
import { Dispatch } from "redux";
import  axiosInstance from "../../config/axios";

export const getUser = async (dispatch: Dispatch) => {
  try {
    dispatch(request());
    const { data } = await axiosInstance.get("/api/v1/getUser");
    dispatch(success(data));
  } catch (error: any) {
    dispatch(failed(error.response));
  }
};

export const logoutUser = async (dispatch: Dispatch) => {
  try {
    dispatch(request());
    await axiosInstance.post("/api/v1/logout");
    dispatch(logout());
    location.reload();
  } catch (error: any) {
    dispatch(failed(error.response));
  }
};
