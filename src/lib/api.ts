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

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(
      'https://saas-platform-backend.onrender.com/api/public/contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: 'cmmnj2md300dgp828hbr08wt6',
          ...data,
        }),
      }
    );
    if (!response.ok) {
      const err = await response.json();
      return { success: false, error: err.message || 'Eroare la trimitere.' };
    }
    return { success: true };
  } catch {
    return { success: false, error: 'Eroare de rețea. Încearcă din nou.' };
  }
}
