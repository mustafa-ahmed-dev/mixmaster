import axios from "axios";

const baseURL = import.meta.env.VITE_NEWSLETTER_API_URL;

const newsletterAxios = axios.create({
  baseURL,
});

export default newsletterAxios;
