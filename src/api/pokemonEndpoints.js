import API from "./axiosInstance";

export const getPokemonList = () => {
  return API("get", `/pokemon/?offset=0&limit=807`);
};

export const getPokemonDetails = (id) => {
  return API("get", `/characteristic/${id}/`);
};
