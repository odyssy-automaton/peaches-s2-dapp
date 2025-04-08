export const discountPrice = (value: bigint, percentage: number): bigint => {
  const amountToSubtract = (value * BigInt(percentage)) / BigInt(100);
  return value - amountToSubtract;
};
