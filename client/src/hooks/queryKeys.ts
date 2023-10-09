const QueryKeys = {
  currentUser: () => ["currentUser"],
  notifications: () => ["notifications"],
  history: (page: number) => ["history", page],
  calendar: (from: string) => ["calendar", from],
};

export default QueryKeys;
