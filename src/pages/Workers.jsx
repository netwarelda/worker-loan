import React, { useEffect, useState } from 'react';
import MakePaymentModal from '../components/MakePaymentModal';
import axios from 'axios';
import AddWorkerModal from '../components/AddWorkerModal';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/workers');
      setWorkers(res.data);
    } catch (err) {
      console.error('Error fetching workers:', err);
    }
  };

  const handleWorkerAdded = (worker) => {
    setWorkers(prev => [...prev, worker]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Workers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Worker
        </button>
      </div>

      <ul className="space-y-2">
        {workers.map((w) => (
          <li key={w._id} className="border p-3 rounded">
            {w.name} – Balance: ${w.currentBalance}
          </li>
        ))}
      </ul>

      {showModal && (
        <AddWorkerModal
          onClose={() => setShowModal(false)}
          onWorkerAdded={handleWorkerAdded}
        />
      )}
    </div>
  );
};

export default Workers;