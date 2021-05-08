import { Client } from "@elastic/elasticsearch";
const client = new Client({
    node: "http://localhost:9200",
});
export default client;
//# sourceMappingURL=elasticsearch.js.map