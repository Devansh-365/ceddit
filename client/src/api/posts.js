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

const getPost = async (postId) => {
  try {
    const res = await fetch(BASE_URL + `api/posts/${postId}`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const upvotePost = async (postId, user) => {
  try {
    const res = await fetch(BASE_URL + `api/posts/${postId}/upvote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const downvotePost = async (postId, user) => {
  try {
    const res = await fetch(BASE_URL + `api/posts/${postId}/downvote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { createPost, getPosts, getPost, upvotePost, downvotePost };
