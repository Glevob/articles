import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const API_BASE = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    articles: [],
    currentArticle: null,
    analyticsData: [],
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    SET_CURRENT_ARTICLE(state, article) {
      state.currentArticle = article;
    },
    SET_ANALYTICS(state, data) {
      state.analyticsData = data;
    },
  },
  actions: {
    // --- Статьи ---
    async fetchArticles({ commit }) {
      const res = await axios.get(`${API_BASE}/articles`);
      commit('SET_ARTICLES', res.data);
    },
    async fetchArticleById({ commit }, id) {
      const res = await axios.get(`${API_BASE}/article/${id}`);
      commit('SET_CURRENT_ARTICLE', res.data);
    },
    async createArticle(_, payload) {
      return await axios.post(`${API_BASE}/article`, payload);
    },
    async updateArticle(_, { id, ...payload }) {
      return await axios.patch(`${API_BASE}/article/${id}`, payload);
    },
    async deleteArticle(_, id) {
      return await axios.delete(`${API_BASE}/article/${id}`);
    },

    // --- Комментарии ---
    async addComment({ dispatch }, { articleId, text }) {
      await axios.post(`${API_BASE}/article/${articleId}/comment`, { text });
      dispatch('fetchArticleById', articleId);
    },
    async updateComment({ dispatch }, { articleId, commentId, text }) {
      await axios.patch(`${API_BASE}/article/${articleId}/comment/${commentId}`, { text });
      dispatch('fetchArticleById', articleId);
    },
    async deleteComment({ dispatch }, { articleId, commentId }) {
      await axios.delete(`${API_BASE}/article/${articleId}/comment/${commentId}`);
      dispatch('fetchArticleById', articleId);
    },

    // --- Аналитика ---
    async fetchAnalytics({ commit }, { dateFrom, dateTo }) {
      const res = await axios.get(`${API_BASE}/analytic/comments`, {
        params: { dateFrom, dateTo }
      });
      commit('SET_ANALYTICS', res.data);
    }
  }
});