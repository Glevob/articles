<template>
  <v-container v-if="article">
    <v-card class="mb-6 pa-6 elevation-2">
      <v-card-title class="headline">{{ article.title }}</v-card-title>
      <v-card-subtitle class="caption">
        Создано: {{ formatDate(article.createdAt) }}
      </v-card-subtitle>
      <v-card-text class="body-1 text--primary mt-2">
        {{ article.text }}
      </v-card-text>

      <v-card-actions>
        <v-btn color="warning" outlined :to="`/article/${article.id}/edit`">
          <v-icon left>mdi-pencil</v-icon> Редактировать
        </v-btn>
        <v-btn color="error" outlined @click="remove">
          <v-icon left>mdi-delete</v-icon> Удалить
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="grey" text to="/">Назад к списку</v-btn>
      </v-card-actions>
    </v-card>

    <CommentAdd :articleId="article.id" />
    <CommentList :comments="article.comments" :articleId="article.id" />
  </v-container>

  <v-container v-else class="text-center">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CommentList from '@/components/CommentList.vue';
import CommentAdd from '@/components/CommentAdd.vue';

export default {
  name: 'ArticleDetail',
  components: { CommentList, CommentAdd },
  computed: {
    ...mapState({ article: 'currentArticle' })
  },
  mounted() {
    this.fetchArticleById(this.$route.params.id);
  },
  methods: {
    ...mapActions(['fetchArticleById', 'deleteArticle']),
    async remove() {
      if (confirm('Удалить эту статью?')) {
        await this.deleteArticle(this.article.id);
        this.$router.push('/');
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString();
    }
  }
};
</script>