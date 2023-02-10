export const appLinks = {
    root: { path: '/' },
    home: { path: '/' },
    cart: { path: '/cart'}
}

export const isLocal = true;
export const suppressText = true;
export const baseImgUrl = 'https://links.papareact.com/';
export const apiUrl = 'https://fakestoreapi.com/';

export const getHost = async () =>
  await fetch(`/api/get/host`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });