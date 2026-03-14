export type DemoRequestPayload = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  industry: string;
  region: string;
  companyDescription: string;
  companyActivities: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  primaryServices: string;
  visualStyle: string;
  inspirationExamples: string;
  websiteType: string;
  desiredPages: string[];
  contactForm: boolean;
  reviews: boolean;
  gallery: boolean;
  pricing: boolean;
  blog: boolean;
  bookingFeature: boolean;
  socialLinks: boolean;
  hasLogo: boolean;
  hasBrandColors: boolean;
  hasTexts: boolean;
  hasImages: boolean;
  hasIcons: boolean;
  reasonForRequest: string;
  desiredOutcome: string;
  deadline: string;
  seriousness: string;
  budgetIndication: string;
  understandsScope: boolean;
  privacyConsent: boolean;
  dataProcessingConsent: boolean;
  honeypot: string;
};

export async function submitDemoRequest(payload: DemoRequestPayload, files: File[]) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, String(value));
  });

  files.forEach((file) => formData.append("attachments", file));

  const response = await fetch("/api/public/demo-requests", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "De aanvraag kon niet worden verstuurd.");
  }

  return response.json();
}
