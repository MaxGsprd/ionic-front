import { environment } from '../src/environments/environment';

export interface AppConfig {
  apiUrl: string;

}

export const HOST: AppConfig = {
    apiUrl: `${environment.apiUrl}/`,
  };

export const HOSTADMIN: AppConfig = {
    apiUrl: `${environment.apiUrl}/admin`,
  };
  
export const HOSTEDITOR: AppConfig = {
apiUrl: `${environment.apiUrl}/editor`,
};

export const HOSTMODERATOR: AppConfig = {
apiUrl: `${environment.apiUrl}/moderator`,
};