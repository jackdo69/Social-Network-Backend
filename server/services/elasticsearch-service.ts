import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';
const client = new Client({ node: 'http://localhost:9200' });

const store = async (index: string, id: string, body: object) => {
    const doc: RequestParams.Index = {
        index, body, id, refresh: true, type: index
    };
    await client.index(doc);
};

const searchBySingleField = async (index: string, body: { field: string, phrase: string; }) => {
    const { field, phrase } = body;
    const params: RequestParams.Search = {
        type: index,
        index,
        body: {
            query: {
                term: {
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

const updateById = async (index: string, id: string, doc: object) => {
    const params: RequestParams.Update = {
        type: index,
        index,
        id,
        body: { doc }
    };
    try {
        const result: ApiResponse = await client.update(params);
        return result;
    } catch (err) {
        throw err;
    }
};

const searchByMultipleFields = async (index: string, body: { phrase: string, fields: Array<string>; }) => {
    const { fields, phrase } = body;
    const queryFields = fields.map(field => {
        return {
            match: {
                field: phrase
            }
        };
    });
    const params: RequestParams.Search = {
        type: index,
        index,
        body: {
            query: {
                bool: {
                    mulst: queryFields
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
        index, id, type: index
    };
    await client.delete(params);
};

const queryBySize = async (index: string, body: { size: number, from: number; }) => {
    const { size, from } = body;
    const params: RequestParams.Search = {
        index, size, from, type: index
    };
    try {
        const result: ApiResponse = await client.search(params);
        return result.body.hits.hits;
    } catch (err) {
        throw err;
    }
};

const queryById = async (index: string, id: string) => {
    const params: RequestParams.Get = {
        index, id, type: index
    };
    try {
        const result: ApiResponse = await client.get(params);
        return result.body._source;
    } catch (err) {
        throw err;
    }
};

const checkExist = async (index: string, id: string) => {
    const params: RequestParams.Exists = {
        index, id, type: index
    };
    try {
        const result: ApiResponse = await client.exists(params);
        return result.body;
    } catch (err) {
        throw err;
    }
};
export {
    store, searchBySingleField, remove, queryBySize, queryById, searchByMultipleFields, updateById, checkExist
};