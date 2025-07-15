import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Report = () => {
  const [summary, setSummary] = useState(null);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/workers/report')
      .then(res => {
        setSummary(res.data.summary);
        setWorkers(res.data.workers);
      })
      .catch(err => console.error('Error loading report:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Monthly Loan Report</h1>

      {summary && (
        <div className="mb-4">
          <p><strong>Total Owed:</strong> ${summary.totalLoaned}</p>
          <p><strong>Total Repaid:</strong> ${summary.totalPayments}</p>
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Worker</th>
            <th className="p-2 border">Current Balance</th>
            <th className="p-2 border">Last Payment</th>
            <th className="p-2 border">Last Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {workers.map(w => (
            <tr key={w._id}>
              <td className="p-2 border">{w.name}</td>
              <td className="p-2 border">${w.currentBalance}</td>
              <td className="p-2 border">${w.lastPayment}</td>
              <td className="p-2 border">{w.lastPaymentDate?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;