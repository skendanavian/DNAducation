module.exports = (db) => {
  const getClasses = () => {
    return db
      .select("*")
      .from("classes")
      .orderBy("id")
      .then((result) => result);
  };

  const getClassById = (id) => {
    return db
    .select("*")
    .from("classes")
    .where({id})
    .then((result) => result);
  };

  const createClass = (data) => {
    const {title, code, description} = data;
    return db("classes")
    .insert({
      title,
      code,
      description
    })
    .returning("*")
    .then((result) => result);
  }

  const getClassesByTeacher = (id) => {
    return db
      .select("*")
      .from("classes")
      .where({ id })
      .orderBy("id")
      .then((result) => result);
  };

  return {
    getClasses,
    getClassById,
    createClass,
    getClassesByTeacher
  };
};