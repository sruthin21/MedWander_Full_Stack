import React from 'react';

const RefreshExcel = () => {
  const refreshData = async () => {
    try {
      const response = await fetch('http://ec2-3-25-93-77.ap-southeast-2.compute.amazonaws.com/export');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'data.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert('Excel sheet updated successfully!');
      } else {
        alert('Error updating Excel sheet.');
      }
    } catch (error) {
      alert('Error updating Excel sheet.');
    }
  };

  return (
    <button
      onClick={refreshData}
      className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded mb-10"
    >
      Refresh Excel
    </button>
  );
};

export default RefreshExcel;
