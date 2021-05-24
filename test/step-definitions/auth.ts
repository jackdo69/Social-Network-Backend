import { after, binding, given, then, when } from 'cucumber-tsflow';
import { assert, expect } from 'chai';
import dataByKey from '../data/dataByKey';
import axios from 'axios';
import * as esClient from '../../server/services/elasticsearch-service';
import { v4 as uuidv4 } from "uuid";


const authUrl = 'http://localhost:4000/auth';

@binding()
export class Auth {
    public statusCode: number = 0;
    public response: object = {};
    public header: object = {};
    public refreshToken: string = '';

    @after("Authorization")
    public async clearAuthIndex() {
        try {
            const data = {
                query: {
                    match_all: {}
                }
            };
            await axios.post('http://localhost:9200/user-test/_delete_by_query', data);
        } catch (err) {
            console.log(err);
        }
    }

    @then("the status code should be {int}")
    public checkingStatusCode(statusCode: number) {
        assert.equal(statusCode, this.statusCode);
    }

    @then("I will receive the access and refresh tokens")
    public checkReceiveTokens() {
        expect(Object.keys(this.response)).to.have.all.members(['accessToken', 'refreshToken']);
    }

    @when("I register with {string}")
    public async registerWithContent(content: string) {
        const data = dataByKey(content);
        try {
            const result = await axios.post(`${authUrl}/register`, data);
            this.statusCode = result.status;
            this.response = result.data;
        } catch (err) {
            this.statusCode = err.response.status;
        }
    }

    @when("I log in with {string}")
    public async loginWithContent(content: string) {
        const data = dataByKey(content);
        try {
            const result = await axios.post(`${authUrl}/login`, data);
            this.statusCode = result.status;
            this.response = result.data;
        } catch (err) {
            this.statusCode = err.response.status;
        }
    }

    @when("I log out the system")
    public async logoutTheSystem() {
        try {
            const result = await axios.delete(`${authUrl}/logout`, { headers: this.header });
            this.statusCode = result.status;
            this.response = result.data;
        } catch (err) {
            this.statusCode = err.response.status;
        }
    }

    @when("I renew my token")
    public async renew() {
        try {
            const result = await axios.post(`${authUrl}/renewToken`, { refreshToken: this.refreshToken }, { headers: this.header });
            this.statusCode = result.status;
            this.response = result.data;
        } catch (err) {
            this.statusCode = err.response.status;
        }
    }

    @given("existing user {string}")
    public async storeUserInDatabase(content: string) {
        const data = dataByKey(content);
        const id = uuidv4();
        await esClient.store('user-test', id, data);
    }

    @given("user {string} is logged in")
    public async logUserInSystem(content: string) {
        const data = dataByKey(content);
        try {
            const result = await axios.post(`${authUrl}/login`, data);
            this.statusCode = result.status;
            this.response = result.data;
            const accessToken = result.data.accessToken;
            this.header = {
                Authorization: `Bearer ${accessToken}`,
            };
            this.refreshToken = result.data.refreshToken;
        } catch (err) {
            console.log(err);
        }
    }
}