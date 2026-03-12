const API_BASE_URL = "https://saas-platform-backend.onrender.com/api";

export const searchListings = async (params?: Record<string, string>) => {
  const query = new URLSearchParams({
    businessId: "cmmnj2md300dgp828hbr08wt6",
    categoryId: "cmmnj2mpu00dkp8286hw4xcww",
    limit: "20",
    ...params,
  });
  const response = await fetch(`${API_BASE_URL}/public/listings/search?${query}`);
  if (!response.ok) throw new Error("Failed to fetch listings");
  return response.json();
};

export const getListingById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/public/listings/${id}`);
  if (!response.ok) throw new Error("Failed to fetch listing");
  return response.json();
};
