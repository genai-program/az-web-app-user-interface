import {
    apiKey,
    cognitiveSearchApiKey,
    endpoint,
    extensionEndpoint,
    indexList,
  } from "./config.js";
  
  
  
  export async function initiateCognitiveSearch() {
    var output = [];
    var messageHistory = [];
  
    for (let i = 0; i < Object.keys(indexList).length; i++) {
      const documentName = Object.keys(indexList)[i];
      const indexName = indexList[documentName].index;
  
      var promptMessage = {
        role: "user",
        content: `Please summarize the data from ${documentName}`,
      };
  
      //push question to history array
      messageHistory.push(promptMessage);
  
      const response = await cognitiveSearch(messageHistory, indexName);
  
      const documentSummary = {
        section: documentName,
        summary: response.choices[0]["message"]["content"],
      };
  
      const promptResponse = {
        role: response.choices[0]["message"]["role"],
        content: response.choices[0]["message"]["content"],
      };
  
      //push answer to history array
      messageHistory.push(promptResponse);
      output.push(documentSummary);
    }
  
    //Summarize everything
  
    try {
      var summarizationPrompt = {
        role: "user",
        content: `Summarise the business overview of this company, based on everything you've learned so far in the chat history`,
      };
      messageHistory.push(summarizationPrompt);
      const response = await cognitiveSearch(messageHistory);
  
      console.log("response = " + JSON.stringify(response));
  
      const overallSummary = {
        section: "Summary",
        summary: response.choices[0]["message"]["content"],
      };
      output.push(overallSummary);
      console.log("output = " + JSON.stringify(output));
  
      return output
      
    } catch (error) {
      console.error("Error at summary = " + error);
    }
  }
  
  
  
  export async function cognitiveSearch(messageHistory, index) {
  
    let url = endpoint
  
    const headers = {
      "api-key": apiKey,
      "Content-Type": "application/json",
    };
  
    var body = {
      messages: messageHistory,
    };
  
    if (index) {
      url = extensionEndpoint
      body.deployment_id = "text-embedding-ada-002-dev";
      body.dataSources = [
        {
          type: "AzureCognitiveSearch",
          parameters: {
            endpoint: "https://acndev01.search.windows.net",
            key: cognitiveSearchApiKey,
            indexName: index,
          },
        },
      ];
    }
  
    var options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
      redirect: "follow",
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("error = ", error);
      throw new Error("Error at CognitiveSearch()");
    }
  }

  