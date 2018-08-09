import { queryMenus } from '../services/menu';
import { refreshRouterData } from '../common/router';

export default {
  namespace: 'menu',

  state: {
    list: [],
    routerData: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMenus, payload);
      refreshRouterData(Array.isArray(response) ? response : []);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
