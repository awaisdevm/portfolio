export interface ContactFormValues {
  name: string;
  email: string;
  platform?: string;
  budget?: string;
  message: string;
  company?: string; // Honeypot field
}

export interface ContactFormResponse {
  ok?: boolean;
  error?: string;
  fields?: Record<string, string>;
}

export class ContactService {
  private static readonly API_URL = "/api/contact";

  /**
   * Sends a contact form submission to the backend API.
   * @param data The form values from the user.
   * @returns A promise resolving to the API response.
   */
  static async sendInquiry(data: ContactFormValues): Promise<ContactFormResponse> {
    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          error: result.error || "An error occurred while sending your message.",
          fields: result.fields,
        };
      }

      return { ok: true };
    } catch (error) {
      console.error("ContactService Error:", error);
      return {
        error: "Network error. Please check your connection and try again.",
      };
    }
  }
}