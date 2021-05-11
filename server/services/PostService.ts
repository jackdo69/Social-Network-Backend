import client from "../lib/elasticsearch.js";
import { v4 as uuidv4 } from "uuid";
import { ErrorHandler } from "../lib/error.js";

class PostService {
  async getPost(data) {
    const { size } = data;
    if (!size) throw new ErrorHandler(422, "Missing required parameters!");
    try {
      const results = await client.search({
        index: "social_network",
        type: "post",
        size: size,
      });
      const posts = results.body.hits.hits.map((item) => {
        return {
          id: item._id,
          title: item._source.title,
          content: item._source.content,
          user: item._source.user,
          createdAt: item._source.createdAt,
          image: item._source.image,
        };
      });
      return posts;
    } catch (err) {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error!");
    }
  }

  async addPost(data) {
    const { title, content, user, image } = data;
    const createdAt = new Date().getTime();
    if (!title || !content || !user)
      throw new ErrorHandler(422, "Missing required parameters!");
    try {
      const id = uuidv4();
      await client.create({
        index: "social_network",
        type: "post",
        id: id,
        body: {
          title,
          content,
          user,
          createdAt,
          image,
        },
      });
      return { id, title, content, user, createdAt, image };
    } catch (err) {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error!");
    }
  }

  async searchPost(data) {
    const { phrase } = data;
    if (!phrase) throw new ErrorHandler(422, "Missing required parameters!");
    try {
      const results = await client.search({
        index: "social_network",
        type: "post",
        body: {
          query: {
            match: {
              content: phrase,
            },
          },
        },
      });
      return results.body.hits.hits;
    } catch (err) {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error!");
    }
  }

  async updateById(data) {
    const { document, postId } = data;
    if (!document || !postId)
      throw new ErrorHandler(422, "Missing required parameters!");

    try {
      await client.update({
        index: "social_network",
        type: "post",
        id: postId,
        body: {
          doc: {
            title: document.title,
            content: document.content,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error!");
    }
  }

  async deleteById(data) {
    const { postId } = data;
    if (!postId) throw new ErrorHandler(422, "Missing required parameters!");
    try {
      await client.delete({
        id: postId,
        index: "social_network",
        type: "post",
      });
    } catch (err) {
      console.log(err);
      throw new ErrorHandler(500, "Internal server error!");
    }
  }
}

export default PostService;
