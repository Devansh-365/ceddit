import { isLoggedIn } from "../utils/auth";

const { BASE_URL } = require("../config");

const createComment = async (postId, data) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + "api/comment/" + postId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateComment = async (postId, commentId, data) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + `api/comment/${commentId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + `api/comment/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getPostComments = async (postId) => {
  try {
    const res = await fetch(BASE_URL + `api/comment/post/${postId}`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const upvoteComment = async (commentId) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + `api/comment/${commentId}/upvote`, {
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

const downvoteComment = async (commentId) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + `api/comment/${commentId}/downvote`, {
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

export {
  getPostComments,
  createComment,
  updateComment,
  deleteComment,
  upvoteComment,
  downvoteComment,
};
