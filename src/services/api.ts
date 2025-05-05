
import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        try {
            const session = await fetchAuthSession();
            const token = session.tokens?.accessToken?.toString();

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.warn('No se pudo obtener el token de Amplify', error);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    response => {
        if (response.data && response.data.success === false) {
            const msg = response.data.message || 'Ocurrió un error';
            window.dispatchEvent(new CustomEvent("global-error", {
                detail: { message: msg }
            }));
            return Promise.reject({ message: msg, response });
        }
        return response;
    },
    error => {
        const msg = error?.response?.data?.message || "Error procesando su solicitud";

        // Lanza alerta global
        window.dispatchEvent(new CustomEvent("global-error", {
            detail: { message: msg }
        }));

        return Promise.reject(error);
    }
);

export default api;
