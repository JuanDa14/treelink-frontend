import axios from 'axios';

import { getCookie } from '../utils';

export const linkApi = axios.create({
	baseURL: `${import.meta.env.VITE_APP_API_URL}/link`,
});
