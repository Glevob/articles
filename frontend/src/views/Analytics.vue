<template>
  <v-container>
    <h1 class="headline mb-4">Аналитика комментариев</h1>

    <v-card class="pa-4 mb-6">
      <v-row>
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="dateFrom"
            type="date"
            label="Дата с"
            outlined
            dense
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="dateTo"
            type="date"
            label="Дата по"
            outlined
            dense
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" class="d-flex align-center">
          <v-btn color="primary" block @click="loadAnalytics" :disabled="!dateFrom || !dateTo">
            Показать
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <div v-if="analyticsData && analyticsData.length">
      <v-card v-for="item in analyticsData" :key="item.id" class="mb-4 pa-4 elevation-1">
        <v-card-title class="subtitle-1 font-weight-bold text--primary">
          Статья: {{ item.title }}
        </v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item v-for="comment in item.comments" :key="comment.id">
            <v-list-item-content>
              <v-list-item-title>{{ comment.text }}</v-list-item-title>
              <v-list-item-subtitle class="caption">
                {{ formatDate(comment.createdAt) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>

    <v-alert v-else-if="searched" type="info" class="mt-4">
      Комментариев за указанный период не найдено.
    </v-alert>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Analytics',
  data: () => ({
    dateFrom: '',
    dateTo: '',
    searched: false
  }),
  computed: {
    ...mapState(['analyticsData'])
  },
  methods: {
    ...mapActions(['fetchAnalytics']),
    async loadAnalytics() {
      if (!this.dateFrom || !this.dateTo) return;

      const fromTimestamp = new Date(this.dateFrom).getTime();
      const toTimestamp = new Date(this.dateTo).setHours(23, 59, 59, 999);

      await this.fetchAnalytics({ dateFrom: fromTimestamp, dateTo: toTimestamp });
      this.searched = true;
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString();
    }
  }
};
</script>