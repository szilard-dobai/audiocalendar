export const verifyPromises = (promises: PromiseSettledResult<unknown>[]) => {
  const rejectedPromises = promises.filter(
    ({ status }) => status === "rejected"
  ) as PromiseRejectedResult[];
  if (rejectedPromises.length) {
    throw new Error(rejectedPromises.map(({ reason }) => reason).join(", "));
  }
};
