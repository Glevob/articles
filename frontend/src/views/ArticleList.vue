<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="headline">Список статей</h1>
      <v-btn color="primary" to="/article/create">
        <v-icon left>mdi-plus</v-icon> Добавить статью
      </v-btn>
    </div>

    <v-card class="elevation-1">
      <v-data-table
        :headers="headers"
        :items="articles"
        :items-per-page="10"
        class="elevation-0"
      >
        <template v-slot:[`item.createdAt`]="{ item }">
            {{ formatDate(item.createdAt) }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon small color="info" @click="$router.push(`/article/${item.id}`)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn icon small color="warning" @click="$router.push(`/article/${item.id}/edit`)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small color="error" @click="removeArticle(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ArticleList',
  data: () => ({
    headers: [
      { text: 'ID', value: 'id', width: '80px' },
      { text: 'Название', value: 'title' },
      { text: 'Дата создания', value: 'createdAt' },
      { text: 'Действия', value: 'actions', sortable: false, align: 'right', width: '150px' },
    ],
  }),
  computed: {
    ...mapState(['articles']),
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    ...mapActions(['fetchArticles', 'deleteArticle']),
    async removeArticle(id) {
      if (confirm('Вы действительно хотите удалить статью?')) {
        await this.deleteArticle(id);
        this.fetchArticles();
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString();
    }
  }
};
</script>