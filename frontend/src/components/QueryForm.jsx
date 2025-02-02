import React, { useState, useEffect } from "react";

function QueryForm() {
  const [formData, setFormData] = useState({
    name: "",
    issueArea: "",
    queryDescription: "",
  });
  const [showCustomIssue, setShowCustomIssue] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [pincode, setPincode] = useState("");

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
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "issueArea") {
      setShowCustomIssue(value === "Others");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Query submitted successfully!");
      setIsSubmitting(false);
      setFormData({
        name: "",
        issueArea: "",
        queryDescription: "",
      });
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to bottom,rgb(222, 150, 78), #ffffff)",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Submit Your Query
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label
              htmlFor="issueArea"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Issue Area
            </label>
            <select
              id="issueArea"
              name="issueArea"
              value={formData.issueArea}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
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
            <div>
              <label
                htmlFor="customIssue"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Specify Custom Issue Area
              </label>
              <input
                type="text"
                id="customIssue"
                name="issueArea"
                value={formData.issueArea}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="queryDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {submitError && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {submitError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default QueryForm;
