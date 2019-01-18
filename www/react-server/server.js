import express from 'express';
import Loadable from 'react-loadable';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';

import config from '../src/webpack.config';

const app = express();
const PORT = process.env.WWW_PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';


app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, '/public')));

if (NODE_ENV !== 'production') {
    const compiler = webpack(config);
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const devMiddleware = webpackDevMiddleware(compiler, {
        contentBase: __dirname,
        noInfo: true,
        silent: false,
        historyApiFallback: true,
        serverSideRender: true,
        publicPath: '/'
    });

    app.use(devMiddleware);

    const fs = devMiddleware.fileSystem;

    app.get('*', (request, response) => {
        fs.readFile(path.join(process.cwd(), '/dist/index.html'), (error, file) => {            
            (error) ? response.sendStatus(404) : response.send(file.toString());
        });
    });
}

app.get('*.js', (request, response, next) => {
    request.url = `${request.url}.gz`;
    response.set('Content-Encoding', 'gzip');
    next();
});


Loadable.preloadAll().then(() => {
    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(JSON.stringify({
            'React Web': 'Loaded',
            'URL:': `http://localhost:${PORT}`,
            'NODE_ENV:': NODE_ENV,
        }, null, 2));
    });
});




