export const processHashtags = (caption) => {
  const re = /#[\w+]+/g;
  const hashtags = caption.match(re) || [];

  return hashtags.map((hashtag) => ({
    where: {
      hashtag,
    },
    create: {
      hashtag,
    },
  }));
};
