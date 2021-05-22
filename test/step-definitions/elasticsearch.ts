import { binding, before, after } from "cucumber-tsflow";
import childProcess from 'child_process';

const exec = childProcess.execSync;

@binding()
class Elasticsearch {
    @before("Elasticsearch")
    public setupTestingIndices(): void {
        exec('./server/scripts/elasticsearch/setup.sh TEST');
    }

    @after("Elasticsearch")
    public clearTestingIndices(): void {
        exec('./server/scripts/elasticsearch/clear.sh TEST');
    }
}

export = Elasticsearch;