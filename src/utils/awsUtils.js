import axios from "axios";

const getSignedURL = async url => {
  try {
    const { data } = await axios.get(url);

    return data;
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

const getVideoStreamingURL = key => {
  return `${process.env.REACT_APP_AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME}/assets/${key}/HLS/${key}.m3u8`;
};

const getThumbnailURL = key => {
  return `${process.env.REACT_APP_AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME}/assets/${key}/Thumbnails/${key}.0000000.jpg`;
};

export { getSignedURL, uploadToAWSS3, getVideoStreamingURL, getThumbnailURL };
