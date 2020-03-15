import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { User, Category, Record } from './models';
import { AuthCrud, AuthDTO } from '@/store/api/endpoints/authEndpoints';
import { CategoryCrud, CategoryDTO } from '@/store/api/endpoints/categoryEndpoints';
import { JournalCrud } from '@/store/api/endpoints/journalEndpoints';
import { UserCrud } from '@/store/api/endpoints/userEndpoints';
import { RecordCrud, ExpenseDTO } from '@/store/api/endpoints/recordCrud';

Vue.use(Vuex);

interface UserState {
  id: number;
  email: string;
  token: string;
}

interface StoreState {
  balance: number;
  categories: Category[];
  journal: Record[];
  loading: boolean;
}

const userModule = {
  state: {
    email: '',
    token: ''
  },

  getters: {
    id(state: UserState) {
      return state.id;
    },

    email(state: UserState) {
      return state.email;
    },

    token(state: UserState) {
      return state.token;
    },

    isLoggedIn(state: UserState) {
      // TODO: add api functionality
    }
  },

  actions: {
    async login(context: any, data: AuthDTO) {
      context.commit('setLoading', true);

      try {
        const token = await AuthCrud.login(data);

        const userState = {
          email: data.email,
          token: token
        };
        context.commit('login', userState);
      } catch(error) {
        console.error(error);
      } finally {
        context.commit('setLoading', false);
      }
    },

    logout(context: any) {
      context.commit('logout');
    }
  },

  mutations: {
    login(state: UserState, payload: UserState) {
      state.email = payload.email;
      state.token = payload.token;
    },

    logout(state: UserState) {
      state.email = '';
      state.token = '';
    }
  }
};

export default new Vuex.Store({
  state: {
    balance: 0,
    categories: [],
    journal: [],

    loading: false
  },

  getters: {
    balance(state): number {
      return state.balance;
    },

    categories(state): Category[] {
      return state.categories;
    },

    journal(state): Record[] {
      return state.journal;
    },

    loading(state): boolean {
      return state.loading;
    },

    currentMonthIncome(state): number {
      const now = new Date();
      let sum = 0;

      if (state.journal) {
        state.journal.forEach((record: Record) => {
          if (!record.category) {
            const date = new Date(record.recordDate);
            if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
              sum += Number.parseFloat(record.sum);
            }
          }
        });
      }

      return sum;
    },

    currentMonthExpenses(state): number {
      const now = new Date();
      let sum = 0;

      if (state.journal) {
        state.journal.forEach((record: Record) => {
          if (record.category) {
            const date = new Date(record.recordDate);
            if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
              sum -= Number.parseFloat(record.sum);
            }
          }
        });
      }

      return sum;
    }
  },

  actions: {
    async fetchCategories(context: any) {
      context.commit('setLoading', true);

      try {
        const token = this.getters['token'];
        const res = await CategoryCrud.getCategories(token);
        context.commit('setCategories', res);
      } catch(error) {
        console.error(error);
      } finally {
        context.commit('setLoading', false);
      }
    },

    async fetchJournal(context: any) {
      context.commit('setLoading', true);

      try {
        const token = this.getters['token'];
        const res = await JournalCrud.getJournal(token);
        context.commit('setJournal', res);
      } catch(error) {
        console.error(error);
      } finally {
        context.commit('setLoading', false);
      }
    },

    async addExpense(context: any, payload: { expense: ExpenseDTO, categoryId: number }) {
      context.commit('setLoading', true);

      try {
        const token = this.getters['token'];
        await RecordCrud.addExpense(payload.expense, payload.categoryId, token);
        await context.dispatch('fetchJournal');
      } catch(error) {
        console.error(error);
      } finally {
        context.commit('setLoading', false);
      }
    },

    async addIncome(context: any, sum: number) {
      context.commit('setLoading', true);

      try {
        const token = this.getters['token'];
        await RecordCrud.addIncome(sum, token);
        await context.dispatch('fetchJournal');
      } catch(error) {
        console.error(error);
      } finally {
        context.commit('setLoading', false);
      }
    },

    async addCategory(context: any, category: CategoryDTO) {
      context.commit('setLoading', true);

      try {
        const token = this.getters['token'];
        await CategoryCrud.addCategory(category, token);
        await context.dispatch('fetchCategories');
      } catch(error) {
        console.error(error);
      } finally {
        context.commit('setLoading', false);
      }
    },

    async fetchUserInfo(context: any) {
      context.commit('setLoading', true);

      try {
        const token = this.getters['token'];
        const res = await UserCrud.getProfile(token);
        context.commit('setBalance', res.balance);
      } catch(error) {
        console.error(error);
      } finally {
        context.commit('setLoading', false);
      }
    }
  },

  mutations: {
    setCategories(state: StoreState, categories: Category[]) {
      state.categories = categories;
    },

    setJournal(state: StoreState, journal: Record[]) {
      state.journal = journal;
    },

    setLoading(state: StoreState, value: boolean) {
      state.loading = value;
    },

    setBalance(state: StoreState, value: number) {
      state.balance = value;
    }
  },

  modules: {
    user: userModule
  },

  plugins: [
    createPersistedState({
      paths: ['user']
    }),
  ],
});
