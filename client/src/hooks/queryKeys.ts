const QueryKeys = {
  currentUser: () => ["currentUser"],
  notifications: () => ["notifications"],
  history: (page: number) => ["history", page],
};

export default QueryKeys;
