// Created by Yanchao in 16/05/2018
export let urlParse = (url) => {
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = url.match(reg);

  if (arr) {
    arr.forEach(function (item) {
      const tempArr = item.substring(1).split('=');
      const key = decodeURIComponent(tempArr[0]);
      const val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};
export let checkPhone = (phone) => {
  return /^1[0123456789]\d{9}$/.test(phone);
};
export let getActiveItemId = () => {
  return ['2194'];
};
export let getActiveCompanyId = () => {
  return ['76', '113', '114', '115', '116', '117', '119'];
};



// getCookies() {
//   if (this.token === null || this.token === undefined || this.token === 'undefined') {
//     const strCookie = document.cookie;
//     const arrCookie = strCookie.split(';');
//     for (let i = 0; i < arrCookie.length; i++) {
//       const arr = arrCookie[i].split('=');
//       if (arr[0].trim() === 'adminToken') {
//         this.token = arr[1];
//       }
//     }
//   }
// }
