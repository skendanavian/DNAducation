module.exports = (db) => {
  const getSections = () => {
    return db
      .select("*")
      .from("sections")
      .orderBy("id")
      .then((result) => result);
  };

  const getUserIdsFromStudentNumbers = (studentNumbers) => {
    if (!studentNumbers.length) {
      return new Promise((res) => res([]));
    }
    return db
      .select("id")
      .from("users")
      .whereIn("student_number", studentNumbers)
      .orderBy("id")
      .then((result) => result);
  };

  const createSectionWithStudentIds = (data) => {
    const { class_id, teacher_user_id, studentIds } = data;

    return db("sections")
      .insert({
        class_id,
        teacher_user_id,
      })
      .returning("*")
      .then((result) => {
        const { id: section_id } = result[0];
        console.log(result);
        const rows = studentIds.map((si) => ({ user_id: si.id, section_id }));
        console.log(rows);
        return db("section_students").insert(rows).returning("*");
      })
      .then((result) => result);
  };

  // This raw query is tested and works... not sure if the knex syntax works yet.
  // SELECT sections.id as section_id, teacher_user_id as teacher_id, classes.id as class_id, title, code  FROM sections
  // JOIN classes ON class_id = classes.id
  // WHERE teacher_user_id = 10

  const getSectionsByTeacher = (id) => {
    console.log("sectionsController, teacher sections of", id);
    return db
      .select(
        "sections.id as section_id",
        "classes.id as class_id",
        "title",
        "description",
        "code",
        "teacher_user_id"
      )
      .from("sections")
      .join("classes", "class_id", "=", "classes  .id")
      .where({
        teacher_user_id: id,
      })
      .then((result) => result);
  };

  // SELECT sections.id as section_id, user_id as student_id, classes.id as class_id, title, code, users.name as teacher_name  FROM sections
  // JOIN classes ON class_id = classes.id
  // JOIN section_students ON section_id = sections.id
  // JOIN users ON users.id = teacher_user_id
  // WHERE user_id = 4;

  // SELECT section_students.id as ssid FROM section_students
  // JOIN users on section_students.user_id = users.id
  // JOIN sections on sections.id = section_students.section_id
  // JOIN exams on sections.id = exams.section_id
  // WHERE users.id = 1 AND exams.id = 2;

  //   getSectionStudentId = (data) => {
  //     const { user_id, exam_id } = data;
  //     return db
  //       .raw(
  //         `
  // SELECT section_students.id as ssid FROM section_students
  // JOIN users on section_students.user_id = users.id
  // JOIN sections on sections.id = section_students.section_id
  // JOIN exams on sections.id = exams.section_id
  // WHERE users.id = ${user_Id} AND exams.id = ${exam_Id};
  // `
  //       )
  //       .then((result) => result);
  //   };

  const getSectionsByStudent = (id) => {
    console.log("sectionsController, student sections of", id);
    return db
      .select(
        "sections.id as section_id",
        "user_id as student_id",
        "classes.id as class_id",
        "title",
        "description",
        "code",
        "teacher_user_id"
      )
      .from("sections")
      .join("section_students", "section_id", "=", "sections.id")
      .join("users", "user_id", "=", "users.id")
      .join("classes", "class_id", "=", "classes.id")
      .where({
        user_id: id,
      })
      .then((result) => result);
  };

  const getExamsBySections = (sectionIds) => {
    if (!sectionIds.length) {
      console.log(
        "sectionsController, exams by sections requested with " + sectionIds
      );
      return [];
    }
    return db
      .select("sections.id as section_id", "exams.id as exam_id", "*")
      .from("sections")
      .join("exams", "section_id", "=", "sections.id")
      .whereIn("section_id", sectionIds)
      .orderBy("due_time")
      .then((result) => result);
  };

  return {
    getSections,
    createSectionWithStudentIds,
    getUserIdsFromStudentNumbers,
    getSectionsByTeacher,
    getSectionsByStudent,
    getExamsBySections,
  };
};
