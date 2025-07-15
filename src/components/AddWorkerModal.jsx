import React, { useState } from 'react';
import axios from 'axios';

const AddWorkerModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Sending request to add worker:', { name });
      const res = await axios.post('http://localhost:5001/api/workers', { name });
      console.log('Response:', res.data);
      onAdd({ name }); // callback to update parent
      onClose(); // close modal
    } catch (err) {
      console.error('Error adding worker:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      setError(err.response?.data?.message || err.message || 'Failed to add worker');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-[300px]">
        <h2 className="text-lg font-bold mb-4">Add Worker</h2>
        {error && (
          <div className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Worker Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#47569e]"
          required
          disabled={loading}
        />
        <div className="flex justify-between">
          <button 
            type="submit" 
            className="bg-[#47569e] text-white px-4 py-2 rounded hover:bg-[#3a4580] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkerModal;