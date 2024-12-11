import { Client, Storage, ID } from "appwrite";

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); 

const storage = new Storage(client);

const deleteFileUrl = async (fileId) => {
  try {
    await storage.deleteFile(process.env.REACT_APP_APPWRITE_STORAGE_BUCKET_ID, fileId);
    return { message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

const getFileUrl = async (fileId) => {
  try {
    const fileUrl = await storage.getFileView(
      process.env.REACT_APP_APPWRITE_STORAGE_BUCKET_ID,
      fileId
    );
    if (!fileUrl) {
      await deleteFileUrl(fileId);
      throw new Error("File URL not available");
    }

    console.log(fileUrl);
    return fileUrl.href;
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  console.log("file", file);
  const maxSize = 50 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("File size exceeds the maximum limit of 50 MB.");
  }
  try {
    const uploadedFile = await storage.createFile(
      process.env.REACT_APP_APPWRITE_STORAGE_BUCKET_ID,
      ID.unique(),
      file
    );
    const fileUrl = await getFileUrl(uploadedFile.$id);
    console.log(fileUrl);
    return fileUrl;
  } catch (error) {
    console.log(error)
  }
};
