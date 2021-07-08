import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';
const client = new Client({ node: 'http://localhost:9200' });

const store = async (index: string, id: string, body: unknown) => {
  const doc: RequestParams.Index = {
    index,
    body,
    id,
    refresh: true,
  };
  await client.index(doc);
};

const bulk = async (index: string, body: Array<unknown>) => {
  const data = body.flatMap((doc) => [{ index: { _index: index } }, doc]);
  await client.bulk({ refresh: true, body: data });
};

const searchBySingleField = async (index: string, body: { field: string; phrase: string }) => {
  const { field, phrase } = body;
  const params: RequestParams.Search = {
    index,
    body: {
      query: {
        match_phrase: {
          [field]: phrase,
        },
      },
    },
  };
  try {
    const result: ApiResponse = await client.search(params);
    return result.body.hits.hits;
  } catch (err) {
    console.log(err.meta.body.error);
    throw err;
  }
};

const updateById = async (index: string, id: string, doc: unknown) => {
  const params: RequestParams.Update = {
    index,
    id,
    body: { doc },
  };
  try {
    const result: ApiResponse = await client.update(params);
    return result;
  } catch (err) {
    throw err;
  }
};

const searchByMultipleFields = async (index: string, body: { phrase: string; fields: Array<string> }) => {
  const { fields, phrase } = body;
  // eslint-disable-next-line
  const queryFields = fields.map((field) => {
    return {
      term: {
        field: phrase,
      },
    };
  });
  const params: RequestParams.Search = {
    index,
    body: {
      query: {
        bool: {
          must: queryFields,
        },
      },
    },
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
    index,
    id,
  };
  await client.delete(params);
};

const query = async (index: string, body: { size?: number; from?: number; fields?: Array<string>; bool?: unknown }) => {
  const { size, from, fields, bool } = body;
  const params: RequestParams.Search = {
    index,
  };
  if (fields) {
    params._source_includes = fields;
    // params._source = 'false';
  }
  if (bool) params.body = { query: { bool } };
  if (size) params.size = size;
  if (from) params.from = from;
  try {
    const result: ApiResponse = await client.search(params);
    return result.body.hits.hits;
  } catch (err) {
    console.log(err.meta.body.error);
    throw err;
  }
};

const queryById = async (index: string, id: string) => {
  const params: RequestParams.Get = {
    index,
    id,
  };
  try {
    const result: ApiResponse = await client.get(params);
    return result.body._source;
  } catch (err) {
    console.log(err.meta.body.error);
    throw err;
  }
};

const checkExist = async (index: string, id: string) => {
  const params: RequestParams.Exists = {
    index,
    id,
  };
  try {
    const result: ApiResponse = await client.exists(params);
    return result.body;
  } catch (err) {
    throw err;
  }
};
//Append an item to a field if that field exist or create a new field and add the item
const upsertItemIntoField = async (index: string, id: string, field: string, item: unknown) => {
  const params: RequestParams.Update = {
    index,
    id,
    body: {
      script: {
        source: `if (ctx._source.containsKey(\"${field}\")) {
                    ctx._source['${field}'].add(params.item);
                } else {
                    ctx._source['${field}'] = [params.item]
                }`,
        lang: 'painless',
        params: {
          item: item,
        },
      },
    },
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
    id,
    body: {
      script: {
        source: `if (ctx._source.containsKey(\"${field}\")) {
                    ctx._source['${field}'].remove(params.index)
                }`,
        lang: 'painless',
        params: {
          index: removeIndex,
        },
      },
    },
  };

  try {
    const result: ApiResponse = await client.update(params);
    return result;
  } catch (err) {
    console.log(err.meta.body.error);
    throw err;
  }
};

export {
  store,
  searchBySingleField,
  remove,
  query,
  queryById,
  searchByMultipleFields,
  updateById,
  checkExist,
  bulk,
  upsertItemIntoField,
  removeItemFromField,
};
