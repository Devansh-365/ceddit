const { BASE_URL } = require("../config");

const getPostComments = async (postId) => {
  try {
    const res = await fetch(BASE_URL + `api/comment/post/${postId}`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { getPostComments };
