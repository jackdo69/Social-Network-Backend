import * as esClient from '../services/elasticsearch-service';
import dataByKey from './dataByKey';

(async () => {
    const data = dataByKey('user-bulk.json');
    try {
        await esClient.bulk('user', data);
    } catch (err) {
        console.log(err);
    }

})();
