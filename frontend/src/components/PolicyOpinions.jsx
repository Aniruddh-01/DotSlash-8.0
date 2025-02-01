import React from 'react';
import PolicyCard from './PolicyCard';  // Import PolicyCard
import './PolicyOpinions.css';

function PolicyOpinions() {
  // Sample policies list (you can fetch from API)
  const policies = [
    {
      id: "policy-1",
      title: "Policy: School Lunch Program Expansion",
      description: "The School Lunch Program Expansion Policy aims to ensure that every child in public schools has access to nutritious, free school meals regardless of their family’s income. This policy is introduced in response to growing concerns about childhood hunger and poor nutrition, which directly impact students' academic performance, concentration, and overall well-being.Under the new expansion, the government will fully cover the cost of breakfast and lunch for all students, removing the need for families to apply for free or reduced-price meals. The program will also focus on improving meal quality by sourcing fresh, locally grown produce and reducing processed foods. Schools will work with nutritionists to design balanced meals that meet dietary guidelines while catering to students with food allergies and cultural preferences."
    },
    {
      id: "policy-2",
      title: "Water Conservation Policy",
      description: "Limits water consumption in urban areas to reduce drought effects."
    },
    {
      id: "policy-3",
      title: "Carbon Tax Implementation",
      description: "Taxes companies based on their carbon emissions to fund green initiatives."
    }
  ];

  return (
    <div className="policy-container">
      {policies.map(policy => (
        <PolicyCard key={policy.id} policy={policy} />
      ))}
    </div>
  );
}

export default PolicyOpinions;
