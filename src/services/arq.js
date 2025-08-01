process.loadEnvFile();
import {stringify} from 'querystring';
import axios from 'axios';
import https from 'node:https';

const {AUTH_ENDPOINT, AUTH_CLIENT_ID, AUTH} = process.env;

const OAUTH_API = `${AUTH_ENDPOINT}oauth/`;

class ArqService {
  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        'content-type': 'application/json',
        credentials: 'same-origin',
        clientId: AUTH_CLIENT_ID
      },
      httpsAgent: new https.Agent({rejectUnauthorized: false})
    });
  }

  async login({username, password}) {
    try {
      const response = await this.axiosInstance.post(
        `${OAUTH_API}login`,
        {username, password},
        {
          headers: {
            redirectUri: AUTH
          }
        }
      );
      return response.data;
    } catch (err) {
      throw Error(err);
    }
  }

  async validateToken(bearerToken) {
    try {
      const token = bearerToken.replace('Bearer ', '');
      const response = await this.axiosInstance.post(`${OAUTH_API}token`, {
        token,
        grant_type: 'client_credentials'
      });
      return response.data;
    } catch (err) {
      throw Error(err);
    }
  }

  async getFromArch(token, route, filters) {
    try {
      const routeWithFilters = filters ? `${route}?${stringify(filters)}` : route;
      const response = await this.axiosInstance.get(`${OAUTH_API}${routeWithFilters}`, {
        headers: {
          Authorization: token,
          redirectUri: AUTH
        }
      });
      return response.data;
    } catch (err) {
      throw Error(err);
    }
  }

  async putFromArch(token, route, body) {
    try {
      const response = await this.axiosInstance.put(`${OAUTH_API}${route}`, body, {
        headers: {
          Authorization: token,
          redirectUri: AUTH
        }
      });
      return response.data;
    } catch (err) {
      throw Error(err);
    }
  }

  fetchUsers(token, filters) {
    const cleanFilters = Object.entries(filters || {})
      .filter(([, value]) => value !== null && value !== undefined)
      .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});

    return this.getFromArch(token, 'users', cleanFilters);
  }

  fetchUser(id, token) {
    return this.getFromArch(token, 'users', {id});
  }

  async getAppRoles(token) {
    const roles = await this.getFromArch(token, 'roles');
    return roles.sort((role, nextRole) => role.name.localeCompare(nextRole.name));
  }
}

export default new ArqService();
