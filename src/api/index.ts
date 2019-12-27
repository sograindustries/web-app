import { makeAuthService } from './auth';
import { makeEcgService } from './ecg';

export const createApi = () => ({
    auth: makeAuthService(),
    ecg: makeEcgService(),
});

export type Api = ReturnType<typeof createApi>;
