"use client";

import { useState } from "react";
import { getStats } from "../utils/api";

const StatsForm = () => {
    const [shortCode, setShortCode] = useState("");
    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setStats(null);

        const result = await getStats(shortCode);
        if (result.error) {
            setError(result.error);
        } else {
            setStats(result);
        }
    };

    return (
        <div>
            <h2>Get URL Stats</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter short URL code" 
                    value={shortCode} 
                    onChange={(e) => setShortCode(e.target.value)} 
                    required 
                />
                <button type="submit">Get Stats</button>
            </form>
            {stats && (
                <div>
                    <p><strong>Long URL:</strong> {stats.longUrl}</p>
                    <p><strong>Clicks:</strong> {stats.clicks}</p>
                    <p><strong>Created At:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
                </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default StatsForm;
