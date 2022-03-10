export const CustomError = class extends Error {
  constructor(public readonly message: string, public readonly code?: number) {
    super(message);
    this.code = code || 400;
  }
};
