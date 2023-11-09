// abs.js

import {
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
} from '@azure/storage-blob';
import { absAccountName, absAccountKey } from '../../app/utils/config'; // Adjust the path as necessary

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { containerName } = req.body;

      // Ensure the container name is provided
      if (!containerName) {
        res.status(400).json({ error: 'Container name is required.' });
        return;
      }

      // Create a SharedKeyCredential
      const sharedKeyCredential = new StorageSharedKeyCredential(absAccountName, absAccountKey);

      // Define SAS permissions and options
      const sasOptions = {
        containerName: containerName, // Use the container name from the request body
        permissions: BlobSASPermissions.parse("racwd"), // Specify your permissions
        startsOn: new Date(new Date().valueOf() - 15 * 60 * 1000), // Start time 15 minutes in the past
        expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour from now
        protocol: SASProtocol.Https, // Enforce HTTPS
        version: '2023-08-03' // Use the same version as in your working example from the Azure portal
      };

      // Generate SAS token
      const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();

      // Send the SAS token back to the client
      res.status(200).json({ sasToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
