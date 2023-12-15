it('should add 42', () => {
  // given
  const mockCalculation = jest.fn((x) => 42 + x);

  // when
  const result = mockCalculation(21);
  const result2 = mockCalculation(22);

  // then
  expect(mockCalculation).toHaveBeenCalledWith(22);
  expect(mockCalculation).toHaveBeenCalledWith(21);
  expect(mockCalculation).toHaveBeenNthCalledWith(1, 21);
  expect(mockCalculation).lastCalledWith(22);
  expect(mockCalculation).toHaveBeenCalled();
  expect(mockCalculation).toHaveBeenCalledTimes(2);
  expect(mockCalculation).toHaveReturnedWith(64);
});
