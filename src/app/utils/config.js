export const companyList = ["Company A", "Company B", "Company C"];

export const baseUrl = "genai-acn-dev.openai.azure.com";
export const deploymentId = "gpt-35-turbo-16k-dev";
export const apiVersion = "2023-08-01-preview";

export const apiKey = "99ede1d85c764a9cb65a0122fa4ce786";
export const cognitiveSearchApiKey =
  "mExfnKGwNQfBjLU2xJbrfvDOTg8it6EJE9aFyeFH8XAzSeAirdrQ";
export const endpoint = `https://${baseUrl}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;
export const extensionEndpoint = `https://${baseUrl}/openai/deployments/${deploymentId}/extensions/chat/completions?api-version=${apiVersion}`;

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
};


// constants for Azure Blob Storage
export const absAccountName = "cawudev85bbdatasources";
export const absAccountKey = "OD/I30LERvZ207cvas6eyLcQUDCg+Jz05SGZec1YMtuET+tp2aqj/aj1jOP8PwLzdURetyqHiOJg+ASt0PmYuQ==";
export const absContainerList = {
  "Cashflow Projection": "cashflow-projection",
  "DBD": "dbd",
  "Financial Statement": "financial-statement",
  "Industry Outlook": "industry-outlook",
  "NCB": "ncb",
  "Risk Criteria": "risk-criteria"
}






