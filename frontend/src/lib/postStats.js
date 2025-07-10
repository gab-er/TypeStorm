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

// Post stats to the TIMED STATISTICS backend API
const postStatsTimed = async (stats) => {
  const res = await axios.post(`${url}/statistic/TIMED`, stats, {
    withCredentials: true,
  });
  return res.data;
};

export const usePostStatsTimed = () => {
  const postStatsTimedMutation = useMutation({
    mutationFn: postStatsTimed,
  });
  return postStatsTimedMutation;
};

// Post stats to the TIMED GAME backend API
const postStatsTimedGame = async (stats) => {
  const res = await axios.post(`${url}/game/TIMED`, stats, {
    withCredentials: true,
  });
  return res.data;
};

export const usePostStatsTimedGame = () => {
  const postStatsTimedGameMutation = useMutation({
    mutationFn: postStatsTimedGame,
  });
  return postStatsTimedGameMutation;
};

// Post stats to the CHALLENGE backend API
const postStatsChallengeLeaderboard = async (stats) => {
  const { challengeId } = stats;
  const res = await axios.post(`${url}/challenge/${challengeId}`, stats, {
    withCredentials: true,
  });
  return res.data;
};

export const usePostStatsChallengeLeaderboard = () => {
  const postStatsChallengeMutation = useMutation({
    mutationFn: postStatsChallengeLeaderboard,
  });
  return postStatsChallengeMutation;
};

// Post stats to the CHALLENGE STATISTICS backend API
const postStatsChallenge = async (stats) => {
  const res = await axios.post(`${url}/statistic/CHALLENGE`, stats, {
    withCredentials: true,
  });
  return res.data;
};

export const usePostStatsChallenge = () => {
  const postStatsChallengeMutation = useMutation({
    mutationFn: postStatsChallenge,
  });
  return postStatsChallengeMutation;
};

// Post stats to the CHALLENGE GAME backend API
const postStatsChallengeGame = async (stats) => {
  const res = await axios.post(`${url}/game/CHALLENGE`, stats, {
    withCredentials: true,
  });
  return res.data;
};

export const usePostStatsChallengeGame = () => {
  const postStatsChallengeGameMutation = useMutation({
    mutationFn: postStatsChallengeGame,
  });
  return postStatsChallengeGameMutation;
};
