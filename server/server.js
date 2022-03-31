const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const PrettyError = require('pretty-error');

const pe = new PrettyError();

const app = express();

app.use(cors());
app.use(bodyParse.json());

(async () => {
    try {

        app.use('/ims-fyp/api', require('./routers'));


        app.listen(8080, () => {
            console.log('Server is running on port 8080');
        });
    } catch (e) {
        console.log(pe.render(e));
    }
})();