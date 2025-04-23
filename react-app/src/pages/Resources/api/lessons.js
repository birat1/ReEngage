const apiKey = 'f38bf624-bdb7-46a7-8bce-b938e5563d0e';
const baseUrl = 'https://open-api.thenational.academy/api/v0/key-stages';

export const fetchLessons = async (subject, unit) => {

    const url = `${baseUrl}/ks2/subject/${subject}/lessons?unit=${unit}&offset=0&limit=100`;
  
    console.log(url)
  
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch ${unit} lessons`);
    }
    
    return await response.json();
};
