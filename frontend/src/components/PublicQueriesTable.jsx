import React, { useState, useEffect } from "react";

function PublicQueriesTable() {
  const [queries, setQueries] = useState([]);
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


  //   if (loading) return <div className="text-center p-4">Loading...</div>;
  //   if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {queries.map((query) => (
            <tr key={query.referenceId} className="hover:bg-gray-50">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PublicQueriesTable;
