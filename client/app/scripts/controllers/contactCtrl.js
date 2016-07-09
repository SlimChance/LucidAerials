'use strict';

function ContactCtrl($timeout) {
    'ngInject'
    let vm = this; // contact

    vm.result = 'hidden';

    $timeout(() => twttr.widgets.load(), 500);
}

module.exports = ContactCtrl;