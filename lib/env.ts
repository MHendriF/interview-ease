export const requireEnvVariable = (key: string) => {
  const value = process.env[key];
  if (value) {
    return value;
  }

  throw new Error(`Environment variable ${key} was not defined!`);
};
