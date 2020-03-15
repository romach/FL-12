import initialCourses from "../data.json";

const updateCourse = (courses, updatedCourse) => {
  return courses.map(course =>
    course.id === updatedCourse.id ? updatedCourse : course
  );
};

const addCourse = (courses, newCourse) => {
  const newCourseId = Math.max(...courses.map(course => course.id)) + 1;
  return [...courses, { ...newCourse, id: newCourseId }];
};

const reducer = (state = { courses: initialCourses }, action) => {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        courses: addCourse(state.courses, action.payload.course)
      };
    case "UPDATE":
      return {
        ...state,
        courses: updateCourse(state.courses, action.payload.course)
      };
    case "REMOVE":
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== action.id)
      };
    default:
      return state;
  }
};

export default reducer;
