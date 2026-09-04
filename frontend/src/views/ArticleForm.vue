<template>
  <v-container>
    <v-card class="pa-6 elevation-3">
      <v-card-title class="headline mb-4">
        {{ isEdit ? 'Редактировать статью' : 'Создать новую статью' }}
      </v-card-title>
      <v-form @submit.prevent="save">
        <v-text-field
          v-model="form.title"
          label="Заголовок статьи"
          outlined
          required
        ></v-text-field>

        <v-textarea
          v-model="form.text"
          label="Текст статьи"
          outlined
          rows="6"
          required
        ></v-textarea>

        <v-btn color="primary" large type="submit" class="mr-3">
          Сохранить
        </v-btn>
        <v-btn color="grey" large to="/">Отмена</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ArticleForm',
  data: () => ({
    form: { title: '', text: '' },
    isEdit: false,
  }),
  computed: {
    ...mapState(['currentArticle'])
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.isEdit = true;
      await this.fetchArticleById(id);
      if (this.currentArticle) {
        this.form.title = this.currentArticle.title;
        this.form.text = this.currentArticle.text;
      }
    }
  },
  methods: {
    ...mapActions(['createArticle', 'updateArticle', 'fetchArticleById']),
    async save() {
      if (this.isEdit) {
        await this.updateArticle({ id: this.$route.params.id, ...this.form });
      } else {
        await this.createArticle(this.form);
      }
      this.$router.push('/');
    }
  }
};
</script>