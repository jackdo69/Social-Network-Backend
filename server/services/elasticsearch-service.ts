import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';
const client = new Client({ node: 'http://localhost:9200' });

const store = async (index: string, id: string, body: object) => {
    const doc: RequestParams.Index = {
        index, body, id, refresh: true, type: index
    };
    await client.index(doc);
};

const bulk = async (index: string, body: Array<object>) => {
    const data = body.map(doc => [{ index: { _index: index, _type: index } }, doc]).flat();
    await client.bulk({ refresh: true, body: data });
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
//Append an item to a field if that field exist or create a new field and add the item
const upsertItemIntoField = async (index: string, id: string, field: string, item: object) => {
    const params: RequestParams.Update = {
        index,
        type: index,
        id,
        body: {
            "script": {
                "source": `if (ctx._source.containsKey(\"${field}\")) {
                    ctx._source['${field}'].add(params.item);
                } else {
                    ctx._source['${field}'] = [params.item]
                }`,
                "lang": "painless",
                "params": {
                    "item": item
                }
            }
        }
    };

    try {
        const result: ApiResponse = await client.update(params);
        return result;
    } catch (err) {
        throw err;
    }
};

const removeItemFromField = async (index: string, id: string, field: string, removeIndex: string) => {
    const params: RequestParams.Update = {
        index,
        type: index,
        id,
        body: {
            "script": {
                "source": `if (ctx._source.containsKey(\"${field}\")) {
                    ctx._source['${field}'].remove(params.index)
                }`,
                "lang": "painless",
                "params": {
                    "index": removeIndex
                }
            }
        }
    };

    try {
        const result: ApiResponse = await client.update(params);
        return result;
    } catch (err) {
        console.log(err.meta.body.error);
        
        throw err;
    }
}

export {
    store,
    searchBySingleField,
    remove,
    queryBySize,
    queryById,
    searchByMultipleFields,
    updateById,
    checkExist,
    bulk,
    upsertItemIntoField,
    removeItemFromField
};