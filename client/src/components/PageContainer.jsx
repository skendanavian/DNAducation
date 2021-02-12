import useAxios from "../hooks/useAxios";
import { useHistory } from "react-router-dom";
import AccountPage from "./AccountPage";

export default function PageContainer(props) {
  const { setToken, setUserId, userId } = props;
  const history = useHistory();
  const axios = useAxios();

  useEffect(() => {
    console.log({ userId });
    if (userId) {
      const sectionsURL = baseURL + `/users/${userId}/sections`;
      const attemptsURL = baseURL + `/users/${userId}/attempts`;
      const examsURL = baseURL + `/sections/exams`;

      // get sections and attempts for user
      Promise.all([axios.get(sectionsURL), axios.get(attemptsURL)])
        .then(([{ data: sectionsRes }, { data: attemptsRes }]) => {
          setAttempts(attemptsRes);
          setSections(sectionsRes);

          const sectionButtons = sectionsRes.map((sec) => {
            const { code } = sec;
            console.log({ sec });
            return { text: code, navAction: () => updateContentView(code) };
          });
          console.log({ sectionButtons });
          // set classcodes and nav callbacks for drawer/sidebar
          setNavButtons((prev) => {
            return [...prev, sectionButtons];
          });

          // get exams for sections user is in
          const sectionIds = sections.map((sec) => sec.section_id);
          return axios.get(examsURL, { params: { sectionIds } });
        })
        .then(({ data: exams }) => {
          const examsWithData = exams.map((exam) => {
            return {
              ...exam,
              section: sections.find((sec) => {
                return sec.section_id === exam.section_id;
              }),
              attempts: attempts.filter((att) => {
                return att.exam_id === exam.id;
              }),
            };
          });
          console.log({ examsWithData });
          setExams(examsWithData);
        })
        .catch((err) => console.error(err));
    } else {
      console.log("no userId", { userId });
    }
  }, []);

  return <AccountPage></AccountPage>;
}
