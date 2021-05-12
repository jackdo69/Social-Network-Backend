import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';
const client = new Client({ node: 'http://localhost:9200' });

const store = async (index: string, id: string, body: object) => {
    const doc: RequestParams.Index = {
        index, body, id, refresh: true
    };
    await client.index(doc);
};

const searchByPhrase = async (index: string, body: { field: string, phrase: string; }) => {
    const { field, phrase } = body;
    const params: RequestParams.Search = {
        index,
        body: {
            query: {
                match: {
                    [field]: phrase
                }
            }
        }
    };
    try {
        const result: ApiResponse = await client.search(params);
        return result.body.hits.hits;
    } catch (err) {
        throw err;
    }
};

const remove = async (index: string, id: string) => {
    const params: RequestParams.Delete = {
        index, id
    };
    await client.delete(params);
};

const queryBySize = async (index: string, body: { size: number, from: number; }) => {
    const { size, from } = body;
    const params: RequestParams.Search = {
        index, size, from
    };
    try {
        const result: ApiResponse = await client.search(params);
        return result.body.hits.hits;
    } catch (err) {
        throw err;
    }
};

export {
    store, searchByPhrase, remove, queryBySize
};