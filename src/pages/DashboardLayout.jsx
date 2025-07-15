import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddWorkerModal from '../components/AddWorkerModal';

const DashboardLayout = () => {
  const [workers, setWorkers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/workers');
      setWorkers(response.data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleAddWorker = async (workerData) => {
    // The AddWorkerModal already makes the API call, so we just need to refresh the list
    fetchWorkers();
    setShowAddModal(false);
  };
  return (
    <div className="relative flex min-h-screen flex-col bg-[#f8f9fc] overflow-x-hidden" style={{ fontFamily: 'Inter, Noto Sans, sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#e6e9f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0d0f1c]">
            <div className="w-4 h-4">
              {/* Logo Icon */}
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363..." fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-lg font-bold">WorkFlow</h2>
          </div>

          <div className="flex justify-end items-center gap-8">
            <div className="flex gap-9">
              <Link className="text-sm font-medium text-[#0d0f1c] hover:text-[#47569e]" to="/">Dashboard</Link>
              <Link className="text-sm font-medium text-[#0d0f1c] hover:text-[#47569e]" to="/workers">Workers</Link>
              <Link className="text-sm font-medium text-[#0d0f1c] hover:text-[#47569e]" to="/">Payments</Link>
              <Link className="text-sm font-medium text-[#0d0f1c] hover:text-[#47569e]" to="/report">Reports</Link>
            </div>
            <button className="flex items-center h-10 px-2.5 rounded-lg bg-[#e6e9f4] text-sm font-bold text-[#0d0f1c]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.8,175.94C216.25,166.38..." />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/...")'
            }}></div>
          </div>
        </header>

        {/* Content */}
        <div className="px-40 py-5 flex justify-center">
          <div className="max-w-[960px] w-full">
            <div className="flex justify-between p-4">
              <p className="text-[32px] font-bold text-[#0d0f1c]">Workers</p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="h-8 px-4 rounded-lg bg-[#47569e] text-sm font-medium text-white hover:bg-[#3a4580] transition-colors"
              >
                Add Worker
              </button>
            </div>

            {/* Table */}
            <div className="p-4 border rounded-lg border-[#ced2e9] bg-[#f8f9fc] overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f8f9fc] text-left text-sm text-[#0d0f1c]">
                    <th className="px-4 py-3">Worker</th>
                    <th className="px-4 py-3">Current Balance</th>
                    <th className="px-4 py-3">Last Payment</th>
                    <th className="px-4 py-3">Last Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-500">
                        No workers found. Click "Add Worker" to get started.
                      </td>
                    </tr>
                  ) : (
                    workers.map((worker) => (
                      <tr key={worker._id} className="border-t border-[#ced2e9] hover:bg-gray-50">
                        <td className="px-4 py-3">{worker.name}</td>
                        <td className="px-4 py-3 text-[#47569e]">${worker.currentBalance.toFixed(2)}</td>
                        <td className="px-4 py-3 text-[#47569e]">${worker.lastPayment.toFixed(2)}</td>
                        <td className="px-4 py-3 text-[#47569e]">
                          {worker.lastPaymentDate ? new Date(worker.lastPaymentDate).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {showAddModal && (
        <AddWorkerModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddWorker}
        />
      )}
    </div>
  );
};

export default DashboardLayout;