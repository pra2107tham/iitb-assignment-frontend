import React from 'react';

function CourseInstanceList({ instances, onViewInstance, onDeleteInstance }) {
  return (
    <table className="w-full border border-gray-300">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="p-2">Course Title</th>
          <th className="p-2">Year-Sem</th>
          <th className="p-2">Code</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {instances.map((instance) => (
          <tr key={instance.id} className="border-t border-gray-300">
            <td className="p-2">{instance.course.title == null ? "Na" : instance.course.title }</td>
            <td className="p-2">{`${instance.year}-${instance.semester}`}</td>
            <td className="p-2">{instance.course.courseCode}</td>
            <td className="p-2 flex gap-2 justify-center">
              <button onClick={() => onViewInstance(instance.id)} className="text-blue-500">
                <i className="fas fa-search"></i>
              </button>
              <button onClick={() => onDeleteInstance(instance.id, instance.year, instance.semester)} className="text-red-500">
                <i className="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseInstanceList;
