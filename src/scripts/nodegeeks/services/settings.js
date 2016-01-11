/**
 * Created by aaronrussell on 11/4/15.
 * @Description:
 */
angular.module('nodegeeks-angular').factory('settings', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout4'
    };

    $rootScope.settings = settings;

    return settings;
});
