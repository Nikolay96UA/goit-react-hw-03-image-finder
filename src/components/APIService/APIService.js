const BASE_URL = 'https://pixabay.com';
const APIKEY = '35605207-c117f35bff793e16a667d50ae';

export const getImages = async ({ searchQuery, currentPage }) => {
  const response = await fetch(
    `${BASE_URL}/api/?q=${searchQuery}&page=${currentPage}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  if (!response.ok) {
    throw new Error('Smth went wrong');
  }
  return response.json();
};
