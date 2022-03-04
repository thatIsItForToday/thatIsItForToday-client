import axios from "axios";

const getSignedURL = async url => {
  try {
    const { data } = await axios.get(url);
    return data.uploadURL;
  } catch (error) {
    console.log(error);
  }
};

const uploadToAWSS3 = async (url, blob, type) => {
  try {
    await axios.put(url, blob, {
      headers: {
        "Content-type": type,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export { getSignedURL, uploadToAWSS3 };
