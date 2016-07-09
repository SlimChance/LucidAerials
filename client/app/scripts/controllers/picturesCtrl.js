'use strict';

function PicturesCtrl(pictureService) {
    'ngInject';
    let vm = this; // pics

    vm.expanded = null;
    vm.allLoaded = false;
    vm.value = 21;

    vm.grabImages = grabImages;
    vm.expand = expand;
    vm.getImage = getImage;

    pictureService.getPictures().then((images) => {
        vm.images = images;
        console.log(vm.images);
        //vm.lazyLoadImages = vm.images.slice(0, 12);
    });

    function grabImages() {
        vm.lazyLoadImages = vm.images.slice(0, vm.value);
        vm.value += 9;

        // 63 count
        if (vm.value >= (vm.images.length + 6)) {
            vm.allLoaded = true;
        }
    };

    function expand(index) {
        vm.expanded = index;
    };

    function getImage(index, picture) {
        if (vm.expanded === index) {
            return picture.largeImage;
        } else {
            return picture.smallImage;
        }
    };
}

module.exports = PicturesCtrl;