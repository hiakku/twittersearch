export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/statuses");
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};