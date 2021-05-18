import { APP_URL } from './constants';

const API_ROUTES = {
    ITEM: {
        CREATE: `/items`,
        DELETE: `/items/:slug`,
        READ: `/items`,
        ROOT: `${APP_URL}/api`,
        UPDATE: `/items/:slug`,
    },
};

export default API_ROUTES;
