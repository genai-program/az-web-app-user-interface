export const companyList = ["Company A", "Company B", "Company C"];

export const oaiInstanceName = "azure-openai-848653";
export const baseUrl = "azure-openai-848653.openai.azure.com";

export const oaiDeploymentId = {
  "gpt-35-turbo-dev": "gpt-35-turbo-dev",
  "gpt-4-32k-dev": "gpt-4-32k-dev",
  "text-embedding-ada-002-dev": "text-embedding-ada-002",
};

export const oaiModelName = {
  "gpt-35-turbo-dev": "gpt-35-turbo",
  "gpt-4-32k-dev": "gpt-4-32k",
  "text-embedding-ada-002-dev": "text-embedding-ada-002",
};

export const oaiApiVersion = "2023-08-01-preview";

export const oaiApiKey = "653ece376dbb4b869add16e29a5a3bc6";
export const cognitiveSearchApiKey =
  "mExfnKGwNQfBjLU2xJbrfvDOTg8it6EJE9aFyeFH8XAzSeAirdrQ";
export const endpoint = `https://${baseUrl}/openai/deployments/${oaiDeploymentId}/chat/completions?api-version=${oaiApiVersion}`;
export const extensionEndpoint = `https://${baseUrl}/openai/deployments/${oaiDeploymentId}/extensions/chat/completions?api-version=${oaiApiVersion}`;

export const indexList = {
  "Financial Statement": {
    index: "cawu-financial-statement-test",
  },
  "Industry Outlook": {
    index: "cawu-industry-outlook-test",
  },
  DBD: {
    index: "cawu-dbd-test",
  },
  NCB: {
    index: "cawu-ncb-test",
  },
  "Risk Criteria": {
    index: "cawu-risk-criteria-test",
  },
  "Cashflow Projection": {
    index: "cawu-cashflow-projection-test",
  },
  "Annual Report": {
    index: "cawu-annual-report-test"
  },
  "Additional Documents": {
    index: "cawu-additional-document-test"
  },
  "External Publication": {
    index: "cawu-external-publication-test"
  },
  "External Rating": {
    index: "cawu-external-rating-test"
  }
};

// constants for Azure Blob Storage
export const absAccountName = "cawudev85bbdatasources";
export const absAccountKey =
  "OD/I30LERvZ207cvas6eyLcQUDCg+Jz05SGZec1YMtuET+tp2aqj/aj1jOP8PwLzdURetyqHiOJg+ASt0PmYuQ==";
export const absContainerList = {
  "Cashflow Projection": "cashflow-projection",
  DBD: "dbd",
  "Financial Statement": "financial-statement",
  "Industry Outlook": "industry-outlook",
  NCB: "ncb",
  "Risk Criteria": "risk-criteria",
};
