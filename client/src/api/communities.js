import { BASE_URL } from "../config";

const createCommunity = async (community, user) => {
  try {
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
    const res = await fetch(
      BASE_URL + `api/communities/655b8c72ac02652a9e1ad4b0`
    );
    const data = await res.json();
    console.log("DATA: ", data);

    return data.posts;
  } catch (err) {
    console.log(err);
  }
};

export { createCommunity, getCommunities, getCommunityPosts };
