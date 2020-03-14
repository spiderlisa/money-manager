import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { User, Category, Record } from './models';
import { AuthCrud, AuthDTO } from '@/store/api/endpoints/authEndpoints';
import { CategoryCrud } from '@/store/api/endpoints/categoryEndpoints';
import { JournalCrud } from '@/store/api/endpoints/journalEndpoints';
import { UserCrud } from '@/store/api/endpoints/userEndpoints';
import { RecordCrud, ExpenseDTO } from '@/store/api/endpoints/recordCrud';
import { formatFromLongDate } from '@/utils/date';

Vue.use(Vuex);

interface UserState {
  id: number,
  email: string,
  token: string
}

interface StoreState {
  balance: number,
  categories: Category[],
  journal: Record[]
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
      try {
        const token = await AuthCrud.login(data);

        const userState = {
          email: data.email,
          token: token
        };
        context.commit('login', userState);
        return data.email;
      } catch(error) {
        console.error(error);
        return null;
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
    journal: []
  },

  getters: {
    categories(state): Category[] {
      return state.categories;
    },

    journal(state): Record[] {
      return state.journal;
    }
  },

  actions: {
    async fetchCategories(context: any) {
      try {
        const token = this.getters['token'];
        const res = await CategoryCrud.getCategories(token);
        context.commit('setCategories', res);
      } catch(error) {
        console.error(error);
      }
    },

    async fetchJournal(context: any) {
      try {
        const token = this.getters['token'];
        let res = await JournalCrud.getJournal(token);

        res = res.map(record => {
          return {
            ...record,
            recordDate: formatFromLongDate(record.recordDate)
          }
        });
        context.commit('setJournal', res);
      } catch(error) {
        console.error(error);
      }
    },

    async addExpense(context: any, payload: { expense: ExpenseDTO, categoryId: number }) {
      try {
        const token = this.getters['token'];
        await RecordCrud.addExpense(payload.expense, payload.categoryId, token);
        await context.dispatch('fetchJournal');
      } catch(error) {
        console.error(error);
      }
    },

    async addIncome(context: any, sum: number) {
      try {
        const token = this.getters['token'];
        await RecordCrud.addIncome(sum, token);
        await context.dispatch('fetchJournal');
      } catch(error) {
        console.error(error);
      }
    }
  },

  mutations: {
    setCategories(state: StoreState, categories: Category[]) {
      state.categories = categories;
    },

    setJournal(state: StoreState, journal: Record[]) {
      state.journal = journal;
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
