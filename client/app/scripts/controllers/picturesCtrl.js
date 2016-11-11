'use strict';

function picturesCtrl($rootScope, pictureService) {
    'ngInject';
    let vm = this; // pics

    vm.expanded = null;
    vm.allLoaded = false;
    vm.value = 21;
    vm.pictureService = pictureService;

    vm.grabImages = grabImages;
    vm.openModal = openModal;
    vm.closeModal = closeModal;
    vm.prevImage = prevImage;
    vm.nextImage = nextImage;
    vm.getImage = getImage;

    pictureService.getRecentPhotos().get((images) => {
        pictureService.pictures = images.data;
    });

    pictureService.getComments().get((comments) => {
        pictureService.comments = comments;
    });

    function grabImages() {
        vm.lazyLoadImages = vm.images.slice(0, vm.value);
        vm.value += 9;

        if (vm.value >= (vm.images.length + 6)) {
            vm.allLoaded = true;
        }
    };

    function openModal(index, image) {
        $rootScope.$emit('modal-open', true);
        vm.modalState = true;
        vm.activeImage = image;
        vm.imageIndex = index;
    }

    function closeModal() {
        $rootScope.$emit('modal-open', false);
        vm.modalState = false;
    }

    function prevImage() {
        if (vm.imageIndex !== 0) {
            vm.imageIndex--;
            vm.activeImage = pictureService.pictures[vm.imageIndex].images.standard_resolution.url;
        }
    }

    function nextImage() {
        if (vm.imageIndex !== pictureService.pictures.length - 1) {
            vm.imageIndex++;
            vm.activeImage = pictureService.pictures[vm.imageIndex].images.standard_resolution.url;
        }
    }

    function getImage(index, picture) {
        if (vm.expanded === index) {
            return picture.largeImage;
        } else {
            return picture.smallImage;
        }
    };
}

module.exports = picturesCtrl;