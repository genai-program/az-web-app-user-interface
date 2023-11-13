const { BlobServiceClient } = require("@azure/storage-blob");
import { absAccountKey, absAccountName, absContainerList} from '../config'

async function uploadFileToBlobStorage(
  connectionString,
  containerName,
  filePath,
  fileName,
  fileContent
) {
  try {
    // Create a BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    // Set metadata
    const metadata = { name: fileName };

    // Upload data to the blob
    const uploadBlobResponse = await blockBlobClient.upload(
      fileContent,
      fileContent.length,
      { metadata }
    );

    console.log(
      `Upload block blob ${fileName} successfully`,
      uploadBlobResponse.requestId
    );
    return uploadBlobResponse.requestId;
  } catch (error) {
    console.error("Error uploading file to Azure Blob Storage:", error);
    throw error;
  }
}
