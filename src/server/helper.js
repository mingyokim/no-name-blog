export const extractPreview = content => '';

export const titleToURL = (title, id) => {
  const lowercaseTitle = title.toLowerCase();
  const words = lowercaseTitle.split(' ');
  words.push(id);
  const url = words.join('-');
  return url.replace(/[^a-zA-Z0-9-_]/g, '');
};
