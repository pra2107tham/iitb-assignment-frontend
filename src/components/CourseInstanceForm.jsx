import React, { useState } from 'react';
import toast from 'react-hot-toast';

function CourseInstanceForm({ courses, onAddInstance }) {
  const [instance, setInstance] = useState({
    courseId: '',
    year: '',
    semester: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstance({
      ...instance,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { courseId, year, semester } = instance;

    // Validation checks
    if (!courseId || !year || !semester) {
      toast.error('All fields are required!');
      return;
    }
    if (!/^\d+$/.test(year)) {
      toast.error('Year must be an integer!');
      return;
    }
    if (!/^\d+$/.test(semester)) {
      toast.error('Semester must be an integer!');
      return;
    }

    const formattedInstance = {
      year: parseInt(year, 10),
      semester: parseInt(semester, 10),
      course: {
        courseCode: parseInt(courseId, 10),
      },
    };

    onAddInstance(formattedInstance);
    setInstance({ courseId: '', year: '', semester: '' });
    toast.success('Course instance added successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md  p-4  shadow-md">
      <select
        name="courseId"
        value={instance.courseId}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">Select course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.courseCode}>
            {course.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="year"
        placeholder="Year"
        value={instance.year}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="semester"
        placeholder="Semester"
        value={instance.semester}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add instance
      </button>
    </form>
  );
}

export default CourseInstanceForm;
