<template>
  <v-card class="pa-4 mb-4">
    <v-card-title class="subtitle-1">Оставить комментарий</v-card-title>
    <v-form @submit.prevent="submitComment">
      <v-textarea
        v-model="text"
        label="Ваш комментарий..."
        rows="3"
        outlined
        dense
        required
      ></v-textarea>
      <v-btn color="success" type="submit" :disabled="!text.trim()">
        Отправить
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CommentAdd',
  props: {
    articleId: { type: [Number, String], required: true }
  },
  data: () => ({ text: '' }),
  methods: {
    ...mapActions(['addComment']),
    async submitComment() {
      if (!this.text.trim()) return;
      await this.addComment({ articleId: this.articleId, text: this.text });
      this.text = '';
    }
  }
};
</script>