import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '40737115-44b84706cba0bed376614eb3e',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImages = (q, page = 1, per_page = 12) => {
  return instance.get('/', {
    params: {
      page,
      q: q,
      per_page,
    },
  });
};
