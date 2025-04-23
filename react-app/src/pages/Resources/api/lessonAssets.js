const apiKey = "f38bf624-bdb7-46a7-8bce-b938e5563d0e";
const baseUrl = "https://open-api.thenational.academy/api/v0/lessons";

export const fetchVideo = async (lesson) => {
  const url = `${baseUrl}/${lesson}/assets/video`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${lesson} video`);
  }

  const blob = await response.blob();
  const videoUrl = URL.createObjectURL(blob);

  return videoUrl;
};