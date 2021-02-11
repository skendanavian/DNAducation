module.exports = (db) => {
  const getSections = () => {
    return db
      .select("*")
      .from("sections")
      .orderBy("id")
      .then((result) => result);
  };

  const createSection = (data) => {
    const {class_id, teacher_user_id} = data;
    return db("classes")
    .insert({
      class_id,
      teacher_user_id
    })
    .returning("*")
    .then((result) => result);
  }


// This raw query is tested and works... not sure if the knex syntax works yet.
// SELECT sections.id as section_id, teacher_user_id as teacher_id, classes.id as class_id, title, code  FROM sections 
// JOIN classes ON class_id = classes.id
// WHERE teacher_user_id = 10

  const getSectionsByTeacher = (id) => {
    return db
    .select("sections.id as section_id", "teacher_user_id as teacher_id", "classes.id as class_id", "title", "code" )
    .from("sections").join("classes", "class_id", "=", "classes.id")
    .where({'teacher_user_id': id})
    .then((result) => result);
  };

// SELECT sections.id as section_id, user_id as student_id, classes.id as class_id, title, code, users.name as teacher_name  FROM sections 
// JOIN classes ON class_id = classes.id
// JOIN section_students ON section_id = sections.id
// JOIN users ON users.id = teacher_user_id
// WHERE user_id = 4;

const getSectionsByStudent = (id) => {
  return db
  .select(
    "sections.id as section_id",
    "user_id as student_id",
    "classes.id as class_id",
    "title",
    "code",
    'users.name as teacher_name')
  .from("sections")
  .join("section_students", 'section_id', '=','sections.id' )
  .join("users", "user_id", "=", "users.id")
  .join("classes", "class_id", "=", "classes.id")
  .where({'user_id': id})
  .then((result) => result);
};

  return {
   getSections,
   createSection,
   getSectionsByTeacher,
   getSectionsByStudent,
  };
};