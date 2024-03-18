import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YT_API_KEY,
});

async function getChannelIdByDisplayName(displayName) {
  try {
    const response = await youtube.search.list({
      part: "snippet",
      type: "channel",
      q: displayName,
    });
    console.log(response.data.items[0].snippet.channelId);
  } catch (error) {
    console.error("Error:", error);
  }
}

// getChannelIdByDisplayName("Learn With Jason");

async function listVideosFromChannel(channelId) {
  try {
    const response = await youtube.search.list({
      channelId: channelId,
      maxResults: 5,
      part: "snippet",
      order: "date", // Order by date
      type: "video",
    });
    return response.data.items;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Learn with Jason Channel ID
// UCnty0z0pNRDgnuoirYXnC5A
export async function getLatestVideos() {
  const videos = await listVideosFromChannel("UCnty0z0pNRDgnuoirYXnC5A");

  //   console.log("videos", videos);

  for (let video of videos) {
    console.log(video.snippet.title);
  }
}

// 0FMLC3CARl0

async function getVideoDetails(videoId) {
  try {
    const response = await youtube.videos.list({
      part: "snippet,contentDetails,statistics", // Specify the parts you need
      id: videoId, // The video ID
    });
    console.log(response.data.items);
  } catch (error) {
    console.error("Error:", error);
  }
}
