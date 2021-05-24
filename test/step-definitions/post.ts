import { after, binding, given, then, when } from 'cucumber-tsflow';
import { assert, expect } from 'chai';
import dataByKey from '../data/dataByKey';
import axios from 'axios';
import * as esClient from '../../server/services/elasticsearch-service';
import { v4 as uuidv4 } from "uuid";
import { Auth } from './auth';


const postUrl = 'http://localhost:4000/post';

@binding([Auth])
export class Post {
    public response: any;
    constructor(protected auth: Auth) { }

    @after()
    public async clearAuthIndex() {
        try {
            const data = {
                query: {
                    match_all: {}
                }
            };
            await axios.post('http://localhost:9200/post-test/_delete_by_query', data);
        } catch (err) {
            console.log(err);
        }
    }

    @given("Posts {string} are loaded in the database")
    public async loadPosts(content: string) {
        const data = dataByKey(content);
        try {
            await esClient.bulk('post-test', data);
        } catch (err) {
            console.log(err);
        }
    }

    @when("I get the posts from the server")
    public async getPosts() {
        try {
            const result = await axios.get(`${postUrl}?size=10`, { headers: this.auth.header });
            this.auth.statusCode = result.status;
            this.response = result.data;

        } catch (err) {
            this.auth.statusCode = err.response.status;
        }
    }

    @then("I receive {int} posts")
    public checkNumberOfPostReceived(amount: number) {
        assert.equal(amount, this.response.length);
    }
}
