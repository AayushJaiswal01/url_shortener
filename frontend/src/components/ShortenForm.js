"use client";

import { useState } from "react";
import { shortenUrl } from "../utils/api";
import "./ShortenForm.css"; // Import the CSS file

const ShortenForm = () => {
    const [longUrl, setLongUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const isValidUrl = (url) => {
        const pattern = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/\S*)?$/i;
        return pattern.test(url.trim());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setShortUrl("");
        setCopied(false);

        let formattedUrl = longUrl.trim();

        if (!isValidUrl(formattedUrl)) {
            setError("Please enter a valid URL");
            return;
        }

        setLoading(true);

        try {
            const result = await shortenUrl(formattedUrl, alias.trim());
            if (result.error) {
                setError(result.error);
            } else {
                setShortUrl(result.short_url);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container">
            <h2>URL Shortener</h2>
            <form onSubmit={handleSubmit} className="shorten-form">
                <input 
                    type="text" 
                    placeholder="Enter long URL" 
                    value={longUrl} 
                    onChange={(e) => setLongUrl(e.target.value)} 
                    required 
                    className="input-field"
                />
                <input 
                    type="text" 
                    placeholder="Custom alias (optional)" 
                    value={alias} 
                    onChange={(e) => setAlias(e.target.value)} 
                    className="input-field"
                />
                <button type="submit" className="shorten-btn" disabled={loading}>
                    {loading ? "Shortening..." : "Shorten"}
                </button>
            </form>

            {shortUrl && (
                <div className="short-url-container">
                    <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                    <button className="copy-btn" onClick={handleCopy}>
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
            )}

            {error && <p className="error-msg">{error}</p>}
        </div>
    );
};

export default ShortenForm;
