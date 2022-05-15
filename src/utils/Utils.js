export const getId = url => {
  console.log(url)
  return url
    .split("/")
    .filter(el => !!el)
    .pop();
};


