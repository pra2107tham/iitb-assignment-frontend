import React, { useState } from 'react';
import toast from 'react-hot-toast';

function CourseForm({ onAddCourse }) {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    courseCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, courseCode } = course;

    // Validation checks
    if (!title || !description || !courseCode) {
      toast.error('All fields are required!');
      return;
    }
    if (!/^\d+$/.test(courseCode)) {
      toast.error('Course Code must be an integer!');
      return;
    }

    onAddCourse(course);
    setCourse({ title: '', description: '', courseCode: '' });
    toast.success('Course added successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md p-4 shadow-md">
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={course.title}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        name="description"
        placeholder="Course Description"
        value={course.description}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="courseCode"
        placeholder="Course Code"
        value={course.courseCode}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Course
      </button>
    </form>
  );
}

export default CourseForm;
