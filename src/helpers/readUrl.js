const readImageUrl = (file, callback) => {
  if (file) {
    let reader = new FileReader();
    reader.onload = callback;
    reader.readAsDataURL(file);
  }
}

export {
  readImageUrl
}