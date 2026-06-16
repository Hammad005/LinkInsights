import axios from "../../services/axios";

// POST REQUESTS
export const createLink = async (data) => axios.post("/links/create", data);

// GET REQUESTS
export const getLinkAnalytics = async () => axios.get("/links/analytics");
export const getMyLinks = async (page, limit) => axios.get(`/links/getMyLinks?page=${page}&limit=${limit}`);
export const getMyClicks = async (shortCode, page, limit) => axios.get(`/links/getMyClicks?shortCode=${shortCode}&page=${page}&limit=${limit}`);

// DELETE REQUESTS
export const deleteLink = async (id) => axios.delete(`/links/deleteLink/${id}`);
