import axios from "axios";
import { API_URL } from "@env";
import { removePlanFromUser } from "../state/user";
import { removePlan } from "../state/plans";
import { Dispatch } from "redux";
import getHeaders from "@/utils/getHeaders";

export default async (id: string, dispatch: Dispatch) => {
  const headers = await getHeaders();
  await axios.delete(`${API_URL}/events/${id}`, headers);
  dispatch(removePlanFromUser(id));
  dispatch(removePlan(id));
};
