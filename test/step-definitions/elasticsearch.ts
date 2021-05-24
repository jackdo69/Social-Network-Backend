import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import childProcess from 'child_process';

const exec = childProcess.execSync;

BeforeAll({}, function () {
    exec('./server/scripts/elasticsearch/setup.sh test');
});

AfterAll({}, function () {
    exec('./server/scripts/elasticsearch/clear.sh test');
});