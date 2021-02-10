module.exports = (db) => {
  const getUsers = () => {
    return db
      .select("*")
      .from("users")
      .orderBy("id")
      .then((result) => result);
  };

  const createNewUser = (data) => {
    const {name, student_number, password, email} = data;
    return db("classes")
    .insert({
      name,
      student_number,
      email,
      password
    })
    .returning("*")
    .then((result) => result);
  }

  const getUserById = (id) => {
    return db
      .select("*")
      .from("users")
      .where({ id })
      .orderBy("id")
      .then((result) => result);
  };

  const getUserByEmail = (email) => {
    return db
      .select("*")
      .from("users")
      .where({ email })
      .then((result) => result);
  };

  return {
    getUsers,
    getUserById,
    getUserByEmail,
    createNewUser
  };
};
