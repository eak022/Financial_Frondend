import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { format } from 'date-fns';
import { useFinancialRecord } from '../../contexts/financial.context';
import EditRecord from '../EditRecord'

function Table() {
  const { records, fetchAllRecords, deleteRecord } = useFinancialRecord();
  const navigate = useNavigate();
  const { user } = useUser();
  const [editingRecord, setEditingRecord] = useState(null); // State to manage the record being edited

  useEffect(() => {
    if (user) {
      fetchAllRecords();
    }
  }, [user, fetchAllRecords]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'คุณแน่ใจหรือ?',
      text: 'คุณจะไม่สามารถกู้คืนสิ่งนี้ได้!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบมัน!',
    });

    if (result.isConfirmed) {
      try {
        await deleteRecord(id);
        Swal.fire('ลบแล้ว!', 'เรคคอร์ดของคุณถูกลบแล้ว.', 'success');
      } catch (error) {
        console.error('ข้อผิดพลาด:', error);
        Swal.fire('ล้มเหลว!', `ไม่สามารถลบเรคคอร์ดได้. ${error.message}`, 'error');
      }
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record); // Set the record to be edited
  };

  const handleEditCancel = () => {
    setEditingRecord(null); // Reset the editing state
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>No</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr
              key={record.id}
              style={{
                backgroundColor: record.category === 'income' ? '#d4edda' : '#f8d7da', // Green for income, red for expense
              }}
            >
              <th>{index + 1}</th>
              <td>{record.category}</td>
              <td>{format(new Date(record.date), 'dd MMM yyyy')}</td>
              <td>{record.description}</td>
              <td>{record.amount}</td>
              <td>{record.paymentMethod}</td>
              <td>
                <button
                  onClick={() => handleEdit(record)}
                  className="btn btn-secondary btn-sm mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>

      {/* Render the EditRecord component when editingRecord is set */}
      {editingRecord && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <EditRecord
              record={editingRecord}
              onCancel={handleEditCancel} // Pass the cancel handler
              onSave={() => setEditingRecord(null)} // Reset editing state on save
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
