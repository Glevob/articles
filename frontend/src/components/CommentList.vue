<template>
  <v-card class="pa-4">
    <v-card-title class="subtitle-1">Комментарии ({{ comments.length }})</v-card-title>
    <v-divider></v-divider>

    <v-list v-if="comments && comments.length">
      <v-list-item v-for="comment in comments" :key="comment.id" class="px-0">
        <v-list-item-content>
          <div v-if="editingId === comment.id">
            <v-textarea v-model="editText" dense outlined rows="2"></v-textarea>
            <v-btn small color="success" class="mr-2" @click="saveEdit(comment.id)">Сохранить</v-btn>
            <v-btn small color="grey" @click="cancelEdit">Отмена</v-btn>
          </div>

          <div v-else>
            <v-list-item-title class="body-1">{{ comment.text }}</v-list-item-title>
            <v-list-item-subtitle class="caption text--secondary">
              {{ formatDate(comment.createdAt) }}
            </v-list-item-subtitle>
          </div>
        </v-list-item-content>

        <v-list-item-action v-if="editingId !== comment.id" class="flex-row">
          <v-btn icon small color="blue" @click="startEdit(comment)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small color="red" @click="removeComment(comment.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-card-text v-else class="text--secondary">Комментариев пока нет.</v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CommentList',
  props: {
    comments: { type: Array, default: () => [] },
    articleId: { type: [Number, String], required: true }
  },
  data: () => ({
    editingId: null,
    editText: ''
  }),
  methods: {
    ...mapActions(['updateComment', 'deleteComment']),
    startEdit(comment) {
      this.editingId = comment.id;
      this.editText = comment.text;
    },
    cancelEdit() {
      this.editingId = null;
      this.editText = '';
    },
    async saveEdit(commentId) {
      await this.updateComment({
        articleId: this.articleId,
        commentId,
        text: this.editText
      });
      this.cancelEdit();
    },
    async removeComment(commentId) {
      if (confirm('Удалить комментарий?')) {
        await this.deleteComment({ articleId: this.articleId, commentId });
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString();
    }
  }
};
</script>