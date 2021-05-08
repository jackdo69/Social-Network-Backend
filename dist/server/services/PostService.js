var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import client from "../data/elasticsearch.js";
import { v4 as uuidv4 } from "uuid";
import { ErrorHandler } from "../lib/error.js";
class PostService {
    getPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { size } = data;
            if (!size)
                throw new ErrorHandler(422, "Missing required parameters!");
            try {
                const results = yield client.search({
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
            }
            catch (err) {
                console.log(err);
                throw new ErrorHandler(500, "Internal server error!");
            }
        });
    }
    addPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, user, image } = data;
            const createdAt = new Date().getTime();
            if (!title || !content || !user)
                throw new ErrorHandler(422, "Missing required parameters!");
            try {
                const id = uuidv4();
                yield client.create({
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
            }
            catch (err) {
                console.log(err);
                throw new ErrorHandler(500, "Internal server error!");
            }
        });
    }
    searchPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phrase } = data;
            if (!phrase)
                throw new ErrorHandler(422, "Missing required parameters!");
            try {
                const results = yield client.search({
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
            }
            catch (err) {
                console.log(err);
                throw new ErrorHandler(500, "Internal server error!");
            }
        });
    }
    updateById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { document, postId } = data;
            if (!document || !postId)
                throw new ErrorHandler(422, "Missing required parameters!");
            try {
                yield client.update({
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
            }
            catch (err) {
                console.log(err);
                throw new ErrorHandler(500, "Internal server error!");
            }
        });
    }
    deleteById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId } = data;
            if (!postId)
                throw new ErrorHandler(422, "Missing required parameters!");
            try {
                yield client.delete({
                    id: postId,
                    index: "social_network",
                    type: "post",
                });
            }
            catch (err) {
                console.log(err);
                throw new ErrorHandler(500, "Internal server error!");
            }
        });
    }
}
export default PostService;
//# sourceMappingURL=PostService.js.map