/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { config } from "./config";
import { ECONNREFUSED } from "../constants";

const { BLOG_API_HOST, BLOG_API_PORT } = config.blog;

const Blog_API_URL = `http://${BLOG_API_HOST}:${BLOG_API_PORT}/api`;

const strapiBlogRoute = "/api/blog/";

const getBlogApiRoute = (route: string) =>
  route.substring(strapiBlogRoute.length);

const constructErrorResponse = (err: any) => {
  return {
    data: null,
    error: {
      details: {},
      name: err.code,
      status: err.code === ECONNREFUSED ? 500 : err.response.status,
      message:
        err.code === ECONNREFUSED ? "Failed to fetch" : err.response.data,
    },
  };
};

export default {
  get: async (ctx: any, _: any) => {
    try {
      const route = getBlogApiRoute(ctx.originalUrl);
      const response = await axios.get(`${Blog_API_URL}/${route}`);

      return response.data;
    } catch (err) {
      ctx.body = constructErrorResponse(err);
    }
  },
  post: async (ctx: any, _: any) => {
    try {
      const route = getBlogApiRoute(ctx.originalUrl);
      const { body, headers } = ctx.request || {};

      const response = await axios.post(
        `${Blog_API_URL}/${route}`,
        body,
        headers
      );

      return response.data;
    } catch (err) {
      ctx.body = constructErrorResponse(err);
      return err;
    }
  },
  put: async (ctx: any, _: any) => {
    try {
      const route = getBlogApiRoute(ctx.originalUrl);
      const { body, headers } = ctx.request || {};

      const response = await axios.put(
        `${Blog_API_URL}/${route}`,
        body,
        headers
      );

      return response.data;
    } catch (err) {
      ctx.body = constructErrorResponse(err);
    }
  },
  patch: async (ctx: any, _: any) => {
    try {
      const route = getBlogApiRoute(ctx.originalUrl);
      const response = await axios.patch(
        `${Blog_API_URL}/${route}`,
        ctx.request.body
      );

      return response.data;
    } catch (err) {
      ctx.body = constructErrorResponse(err);
    }
  },
  delete: async (ctx: any, _: any) => {
    try {
      const route = getBlogApiRoute(ctx.originalUrl);
      const response = await axios.delete(`${Blog_API_URL}/${route}`);

      return response.data;
    } catch (err) {
      ctx.body = constructErrorResponse(err);
    }
  },
};
