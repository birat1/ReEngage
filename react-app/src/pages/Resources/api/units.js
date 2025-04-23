const apiKey = 'f38bf624-bdb7-46a7-8bce-b938e5563d0e';
const baseUrl = 'https://open-api.thenational.academy/api/v0/key-stages';

export const fetchUnits = async (subject,year) => {

  const url = `${baseUrl}/ks2/subject/${subject}/units`;
  const expectedYear = `year-${year}`

  console.log(url)

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${subject} units`);
  }
  

  const data = await response.json();

  // Filter the data to only return units from the specified year
  const yearData = data.find(entry => entry.yearSlug === expectedYear);
  return yearData ? yearData.units : [];
};
