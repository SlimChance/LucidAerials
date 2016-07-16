'use strict';

function contactCtrl($timeout) {
    'ngInject'
    let vm = this; // contact

    vm.result = 'hidden';

    $timeout(() => twttr.widgets.load(), 500);
}

module.exports = contactCtrl;