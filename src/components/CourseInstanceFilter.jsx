import React, { useState } from 'react';

function CourseInstanceFilter({ onFilter }) {
  const [filter, setFilter] = useState({
    year: '',
    semester: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filter);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
      <input
        type="text"
        name="year"
        placeholder="Year"
        value={filter.year}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <select
        name="semester"
        value={filter.semester}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">Select semester</option>
        <option value="1">1</option>
        <option value="2">2</option>
        {/* Add more options as needed */}
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">List instances</button>
    </form>
  );
}

export default CourseInstanceFilter;
