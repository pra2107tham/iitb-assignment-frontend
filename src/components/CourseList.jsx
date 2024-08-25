import React from 'react';

function CourseList({ courses, onDeleteCourse, onViewCourse }) {
  return (
    <table className="w-full mt-4 border border-gray-300">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="p-2">Course Title</th>
          <th className="p-2">Code</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.courseCode} className="border-t border-gray-300">
            <td className="p-2">{course.title}</td>
            <td className="p-2">{course.courseCode}</td>
            <td className="p-2 flex gap-2 justify-center">
              <button onClick={() => onViewCourse(course.courseCode)} className="text-blue-500 hover:text-blue-700">
                <i className="fas fa-search"></i>
              </button>
              <button onClick={() => onDeleteCourse(course.courseCode)} className="text-red-500 hover:text-red-700">
                <i className="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseList;
