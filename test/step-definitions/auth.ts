import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';
import dataByKey from '../data/dataByKey';
import axios from 'axios';
import * as esClient from '../../server/services/elasticsearch-service';
import { v4 as uuidv4 } from "uuid";


const authUrl = 'http://localhost:4000/auth';

@binding()
export class AuthSteps {
    @when("I try to register with {string} status code should be {int}")
    public async registerWithContent(content: string, statusCode: number) {
        const data = dataByKey(content);
        try {
            const result = await axios.post(`${authUrl}/register`, data);
            assert.equal(result.status, statusCode);
        } catch (err) {
            assert.equal(err.response.status, statusCode);
        }
    }

    @given("existing user {string}")
    public async storeUserInDatabase(content: string) {
        const data = dataByKey(content);
        const id = uuidv4();
        await esClient.store('user-test', id, data);
    }

}