import React from 'react';

const Dropdown = ({ items, name, onChange, value }) => {
  return (
    <div className="relative inline-block w-full mb-4">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select Country</option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
