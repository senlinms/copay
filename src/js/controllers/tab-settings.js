'use strict';

angular.module('copayApp.controllers').controller('tabSettingsController', function($scope, appConfigService, $log, lodash, uxLanguage, platformInfo, profileService, feeService, configService, externalLinkService, bitpayCardService, storageService, glideraService, coinbaseService, gettextCatalog, buyAndSellService) {

  var updateConfig = function() {
    $scope.currentLanguageName = uxLanguage.getCurrentLanguageName();
    $scope.feeOpts = feeService.feeOpts;
    $scope.currentFeeLevel = feeService.getCurrentFeeLevel();
    $scope.wallets = profileService.getWallets();
    $scope.buyAndSellServices = buyAndSellService.getLinked();

    configService.whenAvailable(function(config) {
      $scope.unitName = config.wallet.settings.unitName;
      $scope.selectedAlternative = {
        name: config.wallet.settings.alternativeName,
        isoCode: config.wallet.settings.alternativeIsoCode
      };

      // TODO move this to a generic service
      bitpayCardService.getCards(function(err, cards) {
        if (err) $log.error(err);
        $scope.bitpayCards = cards && cards.length > 0;
      });

    });
  };

  $scope.openExternalLink = function() {
    var url = 'https://help.bitpay.com/bitpay-app';
    var optIn = true;
    var title = gettextCatalog.getString('BitPay Help Center');
    var message = gettextCatalog.getString('Help and support information is available at the BitPay Help Center website.');
    var okText = gettextCatalog.getString('Open Help Center');
    var cancelText = gettextCatalog.getString('Go Back');
    externalLinkService.open(url, optIn, title, message, okText, cancelText);
  };

  $scope.$on("$ionicView.beforeEnter", function(event, data) {
    $scope.isCordova = platformInfo.isCordova;
    $scope.appName = appConfigService.nameCase;
  });

  $scope.$on("$ionicView.enter", function(event, data) {
    updateConfig();
  });

});
