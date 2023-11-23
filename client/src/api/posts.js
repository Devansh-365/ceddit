import { BASE_URL } from "../config";

const createPost = async (post, user) => {
  try {
    const res = await fetch(BASE_URL + "api/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(post),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getPosts = async () => {
  try {
    const res = await fetch(BASE_URL + "api/posts");
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { createPost, getPosts };
