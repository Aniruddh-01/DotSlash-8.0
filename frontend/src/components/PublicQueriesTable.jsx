import React, { useState, useEffect } from "react";

const issueAreas = [
  "Education", "Healthcare", "Environment", "Economy",
  "Social Justice", "Technology", "Infrastructure",
  "Defense & Security", "Housing", "Immigration", "Others"
];

function PublicQueriesTable() {
  const [queries, setQueries] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [addressSearchTerm, setAddressSearchTerm] = useState("");
  const [issueArea, setIssueArea] = useState("All");

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("http://localhost:3000/all-complaints");
        const data = await response.json();
        setQueries(data.policies_arr);
      } catch (err) {
        console.error("Failed to fetch queries");
      }
    };
    fetchQueries();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "proposed": return "text-blue-500";
      case "ongoing": return "text-yellow-500";
      case "blocked": return "text-red-500";
      case "approved": return "text-green-500";
      case "rejected": return "text-gray-500";
      default: return "text-black";
    }
  };

  const filteredQueries = queries.filter(query =>
    query.state_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    query.address.toLowerCase().includes(addressSearchTerm.toLowerCase()) &&
    (issueArea === "All" || query.issue_area === issueArea)
  );

  const toggleRow = (referenceNumber) => {
    setExpandedRow(expandedRow === referenceNumber ? null : referenceNumber);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Search by State"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-3 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Search by Address"
          value={addressSearchTerm}
          onChange={(e) => setAddressSearchTerm(e.target.value)}
          className="border rounded p-3 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
          value={issueArea}
          onChange={(e) => setIssueArea(e.target.value)}
          className="border rounded p-3 w-64 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="All">All</option>
          {issueAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        <button
          onClick={() => { setSearchTerm(""); setAddressSearchTerm(""); setIssueArea("All"); }}
          className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left border-b">Reference ID</th>
              <th className="px-6 py-3 text-left border-b">Name</th>
              <th className="px-6 py-3 text-left border-b">Issue Area</th>
              <th className="px-6 py-3 text-left border-b">Description</th>
              <th className="px-6 py-3 text-left border-b">State</th>
              <th className="px-6 py-3 text-left border-b">Address</th>
              <th className="px-6 py-3 text-left border-b">Last Action Date</th>
              <th className="px-6 py-3 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredQueries.map(query => (
              <React.Fragment key={query.reference_number}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 border">{query.reference_number}</td>
                  <td className="px-6 py-4 border">{query.name}</td>
                  <td className="px-6 py-4 border">{query.issue_area}</td>
                  <td className="px-6 py-4 border">{query.summary}</td>
                  <td className="px-6 py-4 border">{query.state_name}</td>
                  <td className="px-6 py-4 border">{query.address}</td>
                  <td className="px-6 py-4 border">
                    {new Date(query.last_action_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border">
                    <button
                      onClick={() => toggleRow(query.reference_number)}
                      className="text-blue-500 text-2xl font-bold p-2 hover:text-blue-700 transition"
                    >
                      {expandedRow === query.reference_number ? "−" : "+"}
                    </button>
                  </td>
                </tr>
                {expandedRow === query.reference_number && (
                  <tr className="bg-gray-50 transition-all duration-300 ease-in-out">
                    <td colSpan="8" className="px-6 py-4 border">
                      <div className="p-4 border rounded-md bg-white shadow">
                        <p>
                          <strong>Status:</strong>{" "}
                          <span className={`${getStatusColor(query.status)} font-semibold`}>
                            {query.status}
                          </span>
                        </p>
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
    </div>
  );
}

export default PublicQueriesTable;
