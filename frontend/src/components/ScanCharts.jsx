import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale
);

export default function ScanCharts({ scan, activeTab }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!scan) return;

        if (activeTab === 'broken') {
            preparebrokenLinksData();
        } else {
            prepareOrphanedPagesData();
        }
    }, [scan, activeTab]);

    const preparebrokenLinksData = () => {
        if (!scan.brokenLinks || scan.brokenLinks.length === 0) {
            setChartData(null);
            return;
        }

        // Group broken links by status code
        const statusCounts = {};
        scan.brokenLinks.forEach(link => {
            const statusCode = link.statusCode || 'Unknown';
            statusCounts[statusCode] = (statusCounts[statusCode] || 0) + 1;
        });

        // Prepare data for status code distribution chart
        const statusCodeData = {
            labels: Object.keys(statusCounts),
            datasets: [
                {
                    label: 'Status Codes',
                    data: Object.values(statusCounts),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        // Group by found on page to see which pages have the most broken links
        const pagesCounts = {};
        scan.brokenLinks.forEach(link => {
            if (link.foundOn) {
                pagesCounts[link.foundOn] = (pagesCounts[link.foundOn] || 0) + 1;
            }
        });

        // Sort and take top 5 pages with most broken links
        const sortedPages = Object.entries(pagesCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const pagesData = {
            labels: sortedPages.map(([page]) => {
                // Truncate long URLs for better display
                return page.length > 30 ? page.substring(0, 30) + '...' : page;
            }),
            datasets: [
                {
                    label: 'Number of Broken Links',
                    data: sortedPages.map(([, count]) => count),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        };

        setChartData({
            statusCodeData,
            pagesData
        });
    };

    const prepareOrphanedPagesData = () => {
        if (!scan.orphanedPages || scan.orphanedPages.length === 0) {
            setChartData(null);
            return;
        }

        // For orphaned pages, we can show distribution by content type or size
        // Here we'll create a simple chart showing the count of orphaned pages
        const orphanedData = {
            labels: ['Orphaned Pages'],
            datasets: [
                {
                    label: 'Count',
                    data: [scan.orphanedPages.length],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        setChartData({
            orphanedData
        });
    };

    if (!chartData) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No data available for visualization</p>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Data Visualization</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeTab === 'broken' ? (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h4 className="text-lg font-medium mb-2">Status Code Distribution</h4>
                            <div className="h-64">
                                <Pie data={chartData.statusCodeData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h4 className="text-lg font-medium mb-2">Pages with Most Broken Links</h4>
                            <div className="h-64">
                                <Bar
                                    data={chartData.pagesData}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: {
                                                    precision: 0
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white p-4 rounded-lg shadow col-span-2">
                        <h4 className="text-lg font-medium mb-2">Orphaned Pages Overview</h4>
                        <div className="h-64">
                            <Bar
                                data={chartData.orphanedData}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                precision: 0
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}