import { Action } from "redux";
import { Dispatch } from "redux";
import { API_ENDPOINT } from "../common/constants/api";
import { API } from "../utilities";
import { Consts } from "../store/StoreTypes";

export interface ConstsAppAction extends Action
{
  response: {
    result: boolean;
    consts: {
      data: any
    };
  };
}

export const READ_CONSTS = "READ_CONSTS";

export const readConsts = async () =>
{
  const response = await API.get(API_ENDPOINT.CONSTS);
  return { type: READ_CONSTS, response };
};
