import axios from "axios";
import url from "../lib/apiUrl";
import { useMutation } from "@tanstack/react-query";

// Post stats to the STANDARD STATISTICS backend API 
const postStatsStandard = async (stats) => {
  const res = await axios.post(`${url}/statistic/STANDARD`, stats, {
    withCredentials: true,
  });
  return res.data;
};

export const usePostStatsStandard = () => {
  const postStatsStandardMutation = useMutation({
    mutationFn: postStatsStandard,
  });
  return postStatsStandardMutation;
};

// Post stats to the STANDARD GAME backend API 
const postStatsStandardGame = async (stats) => {
  const res = await axios.post(`${url}/game/STANDARD`, stats, {
    withCredentials: true,
  });
  return res.data;
};

export const usePostStatsStandardGame = () => {
  const postStatsStandardGameMutation = useMutation({
    mutationFn: postStatsStandardGame,
  });
  return postStatsStandardGameMutation;
};

