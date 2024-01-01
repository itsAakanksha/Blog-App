import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf.js";

 export class DatabaseService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPosts({ title, slug, content,featuredimage, status, userid }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseid,
        conf.appwriteCollectionid,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createDocument :: error ", error);
    }
  }

  async updatePosts(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseid,
        conf.appwriteCollectionid,
        slug,
        {
            title,
            content,
            featuredimage,
            status,

        }

      );
    } catch (error) {
      console.log("Appwrite service :: updateDocument :: error ", error);
    }
  }

  async deletePosts(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseid,
        conf.appwriteCollectionid,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteDocument :: error ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
     return  await this.databases.getDocument(
        conf.appwriteDatabaseid,
        conf.appwriteCollectionid,
        slug
      )
    
      
    } catch (error) {
      console.log("Appwrite service :: getDocument :: error ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseid,
        conf.appwriteCollectionid,
        queries
      )
    } catch (error) {
      console.log("Appwrite service :: getDocument :: error ", error);
      return false;
    }
  }

  // FILE UPLOAD SERVICE

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error ", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const services = new DatabaseService();
export default services;
