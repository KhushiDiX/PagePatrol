// components/ScanForm.jsx
import { useState } from "react";

export default function ScanForm({ onSubmit }) {
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url.trim()) onSubmit(url);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow">
            <label className="block font-semibold mb-2">Enter Website URL:</label>
            <input
                type="url"
                className="w-full border px-4 py-2 rounded"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <button
                type="submit"
                className="mt-3 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                Start Scan
            </button>
        </form>
    );
}