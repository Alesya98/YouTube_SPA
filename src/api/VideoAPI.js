import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_SEARCH_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getVideo = createAsyncThunk(
  "video/get",
  async ({ query, count, sort }, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: "snippet",
          maxResults: count || 12,
          q: query,
          order: sort || "relevance",
          type: "video",
          key: API_KEY,
        },
      });

      const videoId = response.data.items
        .filter((item) => item.id && item.id.videoId)
        .map((item) => item.id.videoId)
        .join(",");

      const statisticResponse = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "snippet, statistics",
          id: videoId,
          key: API_KEY,
        },
      });

      return {
        items: statisticResponse.data.items,
        totalCount: response.data.pageInfo.totalResults,
        searchText: query,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
