import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { User, Category, Record } from './models';
import { AuthCrud, AuthDTO } from '@/store/api/endpoints/authEndpoints';

Vue.use(Vuex);

interface UserState {
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
    login(context: any, data: AuthDTO) {
      AuthCrud.login(data)
        .then((token: string) => {
          const userState = {
            email: data.email,
            token: token
          };

          context.commit('login', userState);
          return data.email;
        })
        .catch((err) => {
          console.error(err);
          return null;
        });
    },

    logout(context: any) {
      context.commit('logout');
    }
  },

  mutations: {
    login(state: UserState, payload: UserState) {
      state.email = payload.email;
      state.token = payload.token;
      console.log(state);
    },

    logout(state: UserState) {
      state.email = '';
      state.token = '';
    }
  }
};

export default new Vuex.Store({
  state: {

  },

  getters: {

  },

  actions: {

  },

  mutations: {

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
