import React, { useState } from 'react';
import axios from 'axios';

const MakePaymentModal = ({ worker, onClose, onPaymentMade }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/workers/${worker._id}/payments`, {
        amount: parseFloat(amount)
      });
      onPaymentMade(res.data); // update parent
      onClose();
    } catch (err) {
      console.error('Error making payment:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-[300px]">
        <h2 className="text-lg font-bold mb-4">Payment for {worker.name}</h2>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 mb-4"
          required
        />
        <div className="flex justify-between">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Pay</button>
          <button type="button" onClick={onClose} className="text-gray-600">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default MakePaymentModal;