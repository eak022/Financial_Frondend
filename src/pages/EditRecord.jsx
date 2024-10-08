import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useFinancialRecord } from '../contexts/financial.context';
import { useUser } from '@clerk/clerk-react';

const EditRecord = ({ record, onCancel, onSave }) => {
  const [financial, setFinancial] = useState(record);
  const { user } = useUser();
  const { updateRecord } = useFinancialRecord();

  useEffect(() => {
    setFinancial(record);
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancial({ ...financial, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!financial.category || !financial.date || !financial.description || !financial.amount || !financial.paymentMethod) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill out all fields',
        icon: 'error',
      });
      return;
    }

    const updatedRecord = { ...financial, userID: user.id };

    try {
      await updateRecord(financial.id, updatedRecord);
      Swal.fire('Updated!', 'Your record has been updated.', 'success');
      onSave(); // Call onSave to close the form
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Failed!', 'Failed to update record.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Category */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <select
          className="select select-bordered"
          name="category"
          value={financial.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a Financial Category</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Date */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Date</span>
        </label>
        <input
          type="date"
          name="date"
          className="input input-bordered"
          value={financial.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          name="description"
          className="textarea textarea-bordered"
          placeholder="Enter description"
          value={financial.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Amount */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Amount</span>
        </label>
        <input
          type="number"
          step="0.01"
          name="amount"
          className="input input-bordered"
          placeholder="Enter amount"
          value={financial.amount}
          onChange={handleChange}
          required
        />
      </div>

      {/* Payment Method */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Payment Method</span>
        </label>
        <select
          name="paymentMethod"
          className="select select-bordered"
          value={financial.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="">Select a payment method</option>
          <option value="cash">Cash</option>
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="form-control mt-6 flex justify-between">
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditRecord;
