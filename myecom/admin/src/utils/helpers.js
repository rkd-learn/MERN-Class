// Check deep object equality
const isObjectEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// Get only not equal object from two objects

const getNotEqualObject = (obj1, obj2) => {
  const obj = {};

  Object.keys(obj1).forEach((key) => {
    if (!isObjectEqual(obj1[key], obj2[key])) {
      obj[key] = obj1[key];
    }
  });

  return obj;
};

const convertJsonToFormData = (obj) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    formData.append(`${key}`, value);
  });
  return formData;
};

module.exports = {
  isObjectEqual,
  getNotEqualObject,
  convertJsonToFormData
};
