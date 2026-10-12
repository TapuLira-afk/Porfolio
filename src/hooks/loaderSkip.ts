let skip = false;

export const skipNextLoader = () => {
  skip = true;
  setTimeout(() => {
    skip = false;
  }, 500);
};

export const consumeLoaderSkip = () => {
  const s = skip;
  skip = false;
  return s;
};
