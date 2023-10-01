export default async function asyncHandler(promise) {
  try {
    if (!(promise instanceof Promise))
      throw new TypeError('promise should be of type "Promise"');

    const result = await promise;
    return [result, undefined];
  } catch (error) {
    return [undefined, error];
  }
}
