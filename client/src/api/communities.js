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

export { createCommunity };
