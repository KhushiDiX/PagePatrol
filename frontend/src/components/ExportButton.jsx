// components/ExportButton.jsx
export default function ExportButton({ exportType = "csv", data }) {
    const handleExport = async () => {
        const blob = new Blob([JSON.stringify(data)], {
            type: exportType === "csv" ? "text/csv" : "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `scan-report.${exportType}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleExport}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
            Export as {exportType.toUpperCase()}
        </button>
    );
}
