import co from 'co';
import Application from './app';

let app = new Application();

co(function* () {
    yield app.run();

    app.closeConsole();
    process.exit();
});

process.on('exit', function () {
    console.log(`[TERMINATE] Closing application...`);
});
//# sourceMappingURL=index.js.map