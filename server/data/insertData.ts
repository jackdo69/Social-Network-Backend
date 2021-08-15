import * as esClient from '../services/elasticsearch-service';
import dataByKey from './dataByKey';

(async () => {
  const userData = dataByKey('user-bulk.json');
  const postData = dataByKey('post-bulk.json');
  try {
    await esClient.bulk('user', userData);
    await esClient.bulk('post', postData);
  } catch (err) {
    console.log(err);
  }
})();
