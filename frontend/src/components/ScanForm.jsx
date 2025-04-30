// components/ScanForm.jsx
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ScanForm({ onSubmit }) {
    const [url, setUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData || !userData._id) {
            toast.error("Please login to scan a website");
            return;
        }

        setIsSubmitting(true);
        onSubmit(url, userData._id)
            .finally(() => setIsSubmitting(false));
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
                className="mt-3 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Scanning...
                    </>
                ) : (
                    'Start Scan'
                )}
            </button>
        </form>
    );
}