import Cookies from "js-cookie";

const cookieStorage = {
  getItem: (key) => {
    return new Promise((resolve) => {
      const value = Cookies.get(key);
      resolve(value);
    });
  },
  setItem: (key, value) => {
    return new Promise((resolve) => {
      Cookies.set(key, value, { expires: 365 });
      resolve();
    });
  },
  removeItem: (key) => {
    return new Promise((resolve) => {
      Cookies.remove(key);
      resolve();
    });
  },
};

export default cookieStorage;
