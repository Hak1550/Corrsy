import { get } from '../ApiServices';

const getCoursesService = async ({ data }) => {
  let { userId, gradeId } = data
  let response = await get(`/courseregistration/${userId}/${gradeId}`);
  return response;
};
const getSubjectsService = async ({ data }) => {
  let response = await get(`/lessons/subject/${data}/`);
  return response;
};
const getLessonsService = async ({ data }) => {
  // console.log(id);
  let response = await get(`/lessons?_id=${data}`);
  return response;
};

export const homeServices = {
  getCoursesService,
  getLessonsService,
  getSubjectsService,

};
