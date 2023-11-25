import { BASE_URL } from "../config";
import { isLoggedIn } from "../utils/auth";

const createCommunity = async (community) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + "api/communities", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(community),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getCommunities = async () => {
  try {
    const res = await fetch(BASE_URL + "api/communities");
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getCommunityPosts = async (communityId) => {
  try {
    const res = await fetch(BASE_URL + `api/communities/${communityId}`);
    const data = await res.json();
    return data.community;
  } catch (err) {
    console.log(err);
  }
};

const onJoinLeaveCommunity = async (communityId, user) => {
  try {
    const res = await fetch(
      BASE_URL + `api/communities/${communityId}/subscribe`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      }
    );
    const data = await res.json();
    console.log("Data: ", data);

    return data;
  } catch (err) {
    console.log(err);
  }
};

const updateCommunity = async (communityId, data) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + "api/communities/" + communityId, {
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

const deleteCommunity = async (communityId) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + "api/communities/" + communityId, {
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

export {
  createCommunity,
  getCommunities,
  getCommunityPosts,
  onJoinLeaveCommunity,
  updateCommunity,
  deleteCommunity,
};
