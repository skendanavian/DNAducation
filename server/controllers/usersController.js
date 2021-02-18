module.exports = (db) => {
  const getUsers = () => {
    return db
      .select("*")
      .from("users")
      .orderBy("id")
      .then((result) => result);
  };

  const createNewUser = (data) => {
    const { name, student_number, password, email, is_teacher } = data;
    return db("users")
      .insert({
        name,
        student_number,
        email,
        password,
        is_teacher
      })
      .returning("*")
      .then((result) => result);
  };

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

  const getUserByStudentNumber = (student_number) => {
    return db
      .select("*")
      .from("users")
      .where({ student_number })
      .then((result) => result);
  };

  const updateTypingProfile = (id, status) => {
    const has_recorded_typedna = status;

    return db("users")
      .where({ id })
      .update({
        has_recorded_typedna,
      })
      .returning("*")
      .then((result) => result);
  };

  return {
    getUsers,
    getUserById,
    getUserByEmail,
    createNewUser,
    getUserByStudentNumber,
    updateTypingProfile,
  };
};
