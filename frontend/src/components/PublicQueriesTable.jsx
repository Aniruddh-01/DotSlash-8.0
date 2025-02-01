// frontend/src/components/PublicQueriesTable.jsx
import React, { useState, useEffect } from "react";

function PublicQueriesTable() {
  const [queries, setQueries] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("http://localhost:3000/all-complaints");
        const data = await response.json();
        console.log(data.policies_arr);
        setQueries(data.policies_arr);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch queries");
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  const toggleRow = async (referenceId) => {
    if (expandedRows.includes(referenceId)) {
      setExpandedRows(expandedRows.filter(id => id !== referenceId));
    } else {
      try {
        const response = await fetch(`http://localhost:3000/query-status/${referenceId}`);
        const data = await response.json();
        setQueries(queries.map(query => query.referenceId === referenceId ? { ...query, ...data } : query));
        setExpandedRows([...expandedRows, referenceId]);
      } catch (err) {
        console.error("Failed to fetch query status:", err);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reference ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Issue Area
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              State
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Action Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {queries.map((query) => (
            <React.Fragment key={query.referenceId}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {query.reference_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{query.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{query.issue_area}</td>
                <td className="px-6 py-4">{query.summary}</td>
                <td className="px-6 py-4 whitespace-nowrap">{query.state_name}</td>
                <td className="px-6 py-4">{query.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(query.last_action_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => toggleRow(query.referenceId)} className="text-blue-500">
                    {expandedRows.includes(query.referenceId) ? "-" : "+"}
                  </button>
                </td>
              </tr>
              {expandedRows.includes(query.referenceId) && (
                <tr className="bg-gray-50 transition-all duration-300 ease-in-out">
                  <td colSpan="8" className="px-6 py-4">
                    <div className="p-4 border rounded-md">
                      <p><strong>Status:</strong> {query.status}</p>
                      <p><strong>Reason:</strong> {query.reason}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PublicQueriesTable;