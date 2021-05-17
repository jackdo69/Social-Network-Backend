import { APP_PORT } from './config';
import { createApp } from './app';

(async () => {

    const app = await createApp();

    app.listen(APP_PORT, () => {
        console.log(`App is running on http://localhost:${APP_PORT}`);
        
    })
})();
