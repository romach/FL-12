export const create = (course) => {
  return { type: "CREATE", payload: {course}};
};

export const update = (course) => {
  return { type: "UPDATE", payload: {course} };
};

export const remove = (id) => {
  return {
    type: "REMOVE",
    id: id
  };
};
