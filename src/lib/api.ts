import { API_BASE_URL, MEDFIL_BUSINESS_ID, MEDFIL_CATEGORY_ID, DEFAULT_LISTINGS_LIMIT } from "@/config/api";

export const searchListings = async (params?: Record<string, string>) => {
  const query = new URLSearchParams({
    businessId: MEDFIL_BUSINESS_ID,
    categoryId: MEDFIL_CATEGORY_ID,
    limit: DEFAULT_LISTINGS_LIMIT,
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
    const response = await fetch(`${API_BASE_URL}/public/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessId: MEDFIL_BUSINESS_ID,
        ...data,
      }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: "Eroare la trimitere." }));
      return { success: false, error: err.message || "Eroare la trimitere." };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Eroare de rețea. Încearcă din nou." };
  }
}
