var mainApp = {
    windowWidth: $(window).width(),
    windowHeight: $(window).height(),
    $root: $('body, html'),
    $body: $('body'),
}

// tooltips
var _tooltips = function () {
    $('[data-toggle="tooltip"]').tooltipster({
        theme: 'tooltipster-punk'
    });
}

// builder actions
var _builderActions = function () {
    var $builderLibraryToggle = $('#imp-builder-library-panel-toggle');
    var $builderLibrary = $('.imp-builder-library-panel');

    var $builderToolsToggle = $('#imp-builder-tools-toggle');
    var $builderTools = $('.imp-builder-tools-menu-panel');

    var $builderPublishToggle = $('.imp-builder-publish-toggle');
    var $builderPublish = $('.imp-builder-publish-actions');

    $builderPublishToggle.click(function () {
        $builderPublish.toggleClass('active');
        $builderLibraryToggle.removeClass('active');
        $builderLibrary.removeClass('active');
        $('.imp-builder-tools-menu-panel.active').removeClass('active');
    })

    $builderLibraryToggle.click(function () {
        $(this).toggleClass('active');
        $builderLibrary.toggleClass('active');
        $('.imp-builder-tools-menu-panel.active').removeClass('active');
    })

    $builderToolsToggle.click(function () {
        $builderTools.toggleClass('active');
        $builderLibraryToggle.removeClass('active');
        $builderLibrary.removeClass('active');
    })
}

// widget settings
var _widgetSettings = function () {
    $('.delete-widget').click(function (e) {
        e.preventDefault();
        var remove = confirm("Do you really want to delete this widget?");
        if(remove == true) {
            $(this).closest('.imp-builder-row').remove();
        }
    })
}



$(document).ready(function () {
    _tooltips();
    _builderActions();
    _widgetSettings();

    tinymce.init({
        selector: '.content-editable',
        menubar: false,
        inline: true,
        force_br_newlines: false,
        force_p_newlines: false,
        forced_root_block: '',
        plugins: [
            'link',
            'textcolor',
            'lists',
            'contextmenu',
            'autolink',
        ],
        toolbar: [
            'undo redo | bold italic underline | fontselect fontsizeselect',
            'forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent'
        ],
        // valid_elements: 'p[style],strong,em,span[style],a[href],ul,ol,li',
        // valid_styles: {
        //   '*': 'font-size,font-family,color,text-decoration,text-align'
        // },
        content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        ]
    })
});