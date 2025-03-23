"use client";
import axios from "axios";

const API_BASE_URL = "https://url-shortener-6g8t.onrender.com"; 

export const shortenUrl = async (longUrl, alias) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/shorten`, { long_url: longUrl, alias });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || "Something went wrong" };
    }
};

export const getStats = async (shortCode) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats/${shortCode}`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || "Invalid short URL" };
    }
};
