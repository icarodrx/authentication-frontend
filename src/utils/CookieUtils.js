const cookieUtils = {
  setCookie: (name, value, days) => {
    let expires = "";

    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }

    let cookieString = `${name}=${value}${expires}`;

    document.cookie = cookieString;
  },

  getCookie: (name) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  },

  removeCookie: (name) => {
    document.cookie = `${name}=; Max-Age=-1`;
  },
};

export default cookieUtils;
