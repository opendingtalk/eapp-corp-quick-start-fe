require('./config$');

function success() {
require('../..//app');
require('../..//page/index/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
