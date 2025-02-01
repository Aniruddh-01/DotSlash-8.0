import React, { useState, useEffect } from "react";

function QueryForm() {
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    issueArea: "",
    state: "",
    address: "",
    queryDescription: "", // added to store the query description
  });
  const [showCustomIssue, setShowCustomIssue] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const issueAreas = [
    "Education",
    "Healthcare",
    "Environment",
    "Economy",
    "Social Justice",
    "Technology",
    "Infrastructure",
    "Defense & Security",
    "Housing",
    "Immigration",
    "Others"
  ];

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/states');
        const data = await response.json();
        setStates(data.states);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'issueArea') {
      setShowCustomIssue(value === 'Others');
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Adjust form data to match backend expectations
    const dataToSubmit = {
      name: formData.name,
      issue_area: formData.issueArea,  // Issue area adjusted
      summary: formData.queryDescription,  // Query description adjusted to summary
      state_name: formData.state,
      address: formData.address,
    };

    try {
      const response = await fetch('http://localhost:3000/submit-complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit)  // Send the adjusted form data
      });

      if (!response.ok) {
        throw new Error('Failed to submit query');
      }

      // Reset form
      setFormData({
        name: "",
        issueArea: "",
        state: "",
        address: "",
        queryDescription: "", // reset query description
      });
      setShowCustomIssue(false);
      alert('Query submitted successfully!');

    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-300">
        <h1 className="text-4xl text-center font-bold mb-6 text-gray-800">
          Query Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="mb-2 font-medium text-gray-700">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state.state_id} value={state.state_name}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="mb-2 font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="issueArea"
              className="mb-2 font-medium text-gray-700"
            >
              Issue Area
            </label>
            <select
              id="issueArea"
              name="issueArea"
              value={formData.issueArea}
              onChange={handleChange}
              required
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="">Select Issue Area</option>
              {issueAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {showCustomIssue && (
            <div className="flex flex-col">
              <label htmlFor="customIssue" className="mb-2 font-medium text-gray-700">
                Specify Issue Area
              </label>
              <input
                type="text"
                id="customIssue"
                name="issueArea"
                value={formData.issueArea === 'Others' ? '' : formData.issueArea}
                onChange={handleChange}
                required
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter custom issue area"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label
              htmlFor="queryDescription"
              className="mb-2 font-medium text-gray-700"
            >
              Query Description
            </label>
            <textarea
              id="queryDescription"
              name="queryDescription"
              value={formData.queryDescription}
              onChange={handleChange}
              required
              rows="4"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors disabled:bg-blue-300"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          {submitError && (
            <div className="text-red-500 text-sm mt-2">
              {submitError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default QueryForm;
