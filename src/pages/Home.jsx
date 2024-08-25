import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CourseForm from '../components/CourseForm';
import CourseInstanceForm from '../components/CourseInstanceForm';
import CourseList from '../components/CourseList';
import CourseInstanceFilter from '../components/CourseInstanceFilter';
import CourseInstanceList from '../components/CourseInstanceList';
import axios from 'axios';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);

  const addCourse = async (course) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/courses`, course);
      setCourses([...courses, response.data]);
      toast.success('Course added successfully!');
    } catch (error) {
      toast.error('Failed to add course');
      console.error("Failed to add course", error);
    }
  };
  
  const addInstance = async (instance) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/instances`, instance);
      setInstances([...instances, response.data]);
      toast.success('Instance added successfully!');
    } catch (error) {
      toast.error('Failed to add instance');
      console.error("Failed to add instance", error);
    }
  };

  const deleteCourse = async (courseCode) => {
    try {
      const courseCodeInt = parseInt(courseCode, 10); // Convert to integer
      console.log(courseCodeInt);
      await axios.delete(`${import.meta.env.VITE_API}/courses/${courseCodeInt}`);
      setCourses(courses.filter(course => course.courseCode !== courseCodeInt));
      toast.success('Course deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete course');
      console.error("Failed to delete course", error);
    }
  };
  
  
  const deleteInstance = async (instanceId, year, semester) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/instances/${year}/${semester}/${instanceId}`);
      setInstances(instances.filter(instance => instance.id !== instanceId));
      toast.success('Instance deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete instance');
      console.error("Failed to delete instance", error);
    }
  };

  const viewCourse = async (courseCode) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/courses/${courseCode}`);
      toast.success('Course details fetched!');
      alert(`Course details: ${JSON.stringify(response.data)}`);
    } catch (error) {
      toast.error('Failed to fetch course');
      console.error("Failed to fetch course", error);
    }
  };
  
  const viewInstance = async (instanceId, year, semester) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/instances/${year}/${semester}/${instanceId}`);
      toast.success('Instance details fetched!');
      alert(`Instance details: ${JSON.stringify(response.data)}`);
    } catch (error) {
      toast.error('Failed to fetch instance');
      console.error("Failed to fetch instance", error);
    }
  };

  const filterInstances = (filter) => {
    const { year, semester } = filter;
    const filtered = instances.filter(instance => 
      (!year || instance.year === year) && 
      (!semester || instance.semester === semester)
    );
    setFilteredInstances(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCourses = await axios.get(`${import.meta.env.VITE_API}/courses`);
        console.log(allCourses.data);
        setCourses(allCourses.data);

        const allInstances = await axios.get(`${import.meta.env.VITE_API}/instances`);
        console.log(allInstances.data);
        setInstances(allInstances.data);
        setFilteredInstances(allInstances.data);
        toast.success('Data fetched successfully!');
      } catch (error) {
        toast.error('Failed to fetch data');
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='p-16 flex flex-col gap-8 justify-center'>
      <div className='flex gap-16 justify-evenly'>
        <CourseForm onAddCourse={addCourse} />
        <CourseInstanceForm courses={courses} onAddInstance={addInstance} />
      </div>
      <div className='flex gap-8'>
        <div className='w-1/2'>
          <CourseList
            courses={courses}
            onDeleteCourse={deleteCourse}
            onViewCourse={viewCourse}
          />
        </div>
        <div className='w-1/2'>
          <CourseInstanceFilter onFilter={filterInstances} />
          <CourseInstanceList
            instances={filteredInstances}
            onViewInstance={viewInstance}
            onDeleteInstance={deleteInstance}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
