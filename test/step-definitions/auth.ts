import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';
import dataByKey from '../data/dataByKey'


@binding()
export class AuthSteps {
    @when(/ I try to register with "([^"]*)"/)
    public registerWithContent(content: string) {
        const data = dataByKey(content)
        console.log(data);
        
    }

}