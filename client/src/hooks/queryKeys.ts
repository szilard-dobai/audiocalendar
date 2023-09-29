const QueryKeys = {
  currentUser: () => ["currentUser"],
  history: (page: number) => ["history", page],
};

export default QueryKeys;
