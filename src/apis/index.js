import authorizedAxiosInstance from "../utils/authorizeAxios";
import { API_ROOT } from "../utils/constants";
export const getEventsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/events`);
  return response.data;
};
export const addEventAPI = async (event) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/events`,
    event
  );
  return response.data;
};
//xóa
export const deleteEventData = async (eventId) => {
  const response = await authorizedAxiosInstance.delete(
    `${API_ROOT}/events/${eventId}`
  );
  return response.data;
};
//Cập nhật
export const updateEventAPI = async (event, id) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/events/${id}`,
    event
  );
  return response.data;
};

export const getUsersAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/users`);
  return response.data;
};
