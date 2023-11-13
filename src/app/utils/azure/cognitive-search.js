const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");

const endpoint = "https://cawu-dev-85bb-search.search.windows.net";
const apiKey = "WTxLDrANEaB5tkOK137QeBxONZdkcAOABF9zUWXxSFAzSeCSIQtf";

const indexName = "cawu-financial-statement-test";

const idxList = ["cawu-additional-document-test",
"cawu-annual-report-test",
"cawu-cashflow-projection-test",
"cawu-external-publication-test",
"cawu-external-rating-test",
"cawu-financial-statement-test",
"cawu-industry-outlook-test",
"cawu-ncb-test",
"cawu-risk-criteria-test",]

const client = new SearchClient(endpoint, indexName, new AzureKeyCredential(apiKey));


async function queryIndex() {
    const options = {
      // Add query options here, such as filter, select, orderBy, top, skip, etc.
    };
  
    const searchQuery = "<your-query>"; // Replace with your search query
    const searchResults = await client.search(searchQuery, options);
  
    for await (const result of searchResults.results) {
      console.log(result);
    }
  }
  
  queryIndex().catch((err) => {
    console.error("Error querying index:", err);
  });
  