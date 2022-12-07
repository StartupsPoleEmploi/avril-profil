import get from 'lodash.get';

export default async function ({ store, route }) {
  const timestamp = get(store.state, 'serverFeedback.timestamp');
  if (timestamp && (Date.now() - timestamp > 2000)) {
    store.commit('removeFeedback');
  }
}

