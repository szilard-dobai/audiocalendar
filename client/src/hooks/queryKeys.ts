const QueryKeys = {
  currentUser: () => ["currentUser"],
  notifications: () => ["notifications"],
  songs: (from: string) => ["songs", from],
};

export default QueryKeys;
