const getSizeInBytes = obj => {
  let str = (typeof obj === 'string') ? obj : JSON.stringify(obj);
  return new TextEncoder().encode(str).length;
};

const logSizeInBytes = (description, obj) => {
  const bytes = getSizeInBytes(obj);
  console.log(`${description} is approximately ${bytes} B`);
};

export default logSizeInBytes;