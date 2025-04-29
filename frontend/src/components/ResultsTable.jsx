// components/ResultsTable.jsx
export default function ResultsTable({ brokenLinks, orphanedPages }) {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Broken Links</h2>
            <table className="w-full table-auto border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Link</th>
                        <th className="border p-2">Status Code</th>
                        <th className="border p-2">Found On</th>
                    </tr>
                </thead>
                <tbody>
                    {brokenLinks.map((item, idx) => (
                        <tr key={idx}>
                            <td className="border p-2">{item.url}</td>
                            <td className="border p-2">{item.statusCode}</td>
                            <td className="border p-2">{item.foundOn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-xl font-semibold mt-6 mb-2">Orphaned Pages</h2>
            <ul className="list-disc pl-5">
                {orphanedPages.map((page, idx) => (
                    <li key={idx} className="text-red-700">{page}</li>
                ))}
            </ul>
        </div>
    );
}