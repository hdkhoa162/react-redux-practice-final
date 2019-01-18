/***
 * Copyright 2017 @SexyBeastDating
 * Author: Khoa Huynh
 * Date: 30/07/2017
 * File: app/helpers/logger.js
 * Description: A helper module to handle loggers.
 ***/

import bunyan from 'bunyan';
import PrettyStream from 'bunyan-prettystream';


const Logger = () => {
    
    const prettyStd = new PrettyStream();

    prettyStd.pipe(process.stdout);

    const logger = bunyan.createLogger({
        name: 'API',      
        streams: [{
            level: 'debug',
            type: 'raw',
            stream: prettyStd
        }]
    });

    return logger;

}    

export default Logger();
