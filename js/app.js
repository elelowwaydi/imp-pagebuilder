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

// page builder main actions
var _builderPageActions = function () {
    var $builderLibraryToggle = $('#imp-builder_library-panel-toggle');
    var $builderLibrary = $('.imp-builder_library-panel');

    var $builderToolsToggle = $('#imp-builder_tools-toggle');
    var $builderTools = $('.imp-builder_tools-menu-panel');

    var $builderPublishToggle = $('.imp-builder_publish-toggle');
    var $builderPublish = $('.imp-builder_publish-actions');

    $builderPublishToggle.click(function () {
        $builderPublish.toggleClass('active');
        $builderLibraryToggle.removeClass('active');
        $builderLibrary.removeClass('active');
        $('.imp-builder_tools-menu-panel.active').removeClass('active');
    })

    $builderLibraryToggle.click(function () {
        $(this).toggleClass('active');
        $builderLibrary.toggleClass('active');
        $('.imp-builder_tools-menu-panel.active').removeClass('active');
    })

    $builderToolsToggle.click(function () {
        $builderTools.toggleClass('active');
        $builderLibraryToggle.removeClass('active');
        $builderLibrary.removeClass('active');
    })
}

// builder row settings
// row level widget settings (move, clone, row-settings, delete)
var _builderRowSettings = function() {
    var copyHelper;
    $(".imp-builder_rows-widget-list").sortable({
    connectWith: ".imp-builder_stage",
    placeholder: "imp-builder_row-placeholder",
    helper: function(event, el) {
        copyHelper = el.clone().insertAfter(el);
        return el.clone();
    },
    beforeStop: function(event, ui) {
        $(this).sortable(
        "option",
        "selfDrop",
        $(ui.placeholder).parent()[0] == this
        );
    },
    stop: function(event, ui) {
        copyHelper && copyHelper.remove();
        var $sortable = $(this);
        if ($sortable.sortable("option", "selfDrop")) {
        $sortable.sortable("cancel");
        return;
        }
    }
    });
    $(".imp-builder_stage").sortable({
    items: ".imp-builder_row-widget",
    placeholder: "imp-builder_row-placeholder",
    receive: function(e, ui) {
        copyHelper = null;
    }
    });


    // $(".rows-list .imp-builder_row").draggable({
    //     helper: function() {
    //       return $(this).clone().removeClass("row-item").appendTo(".imp-builder_stage");
    //     },
    //     cursor: "move",
    //     containment: "document"
    //   });

    // $('.imp-builder_stage').droppable({
    //     accept: '.row-item',
    //     drop: function(event, ui) { 
    //         if (!ui.draggable.hasClass("dropped"))
    //           $(this).append($(ui.draggable).clone().removeClass("ui-draggable").removeClass("dropped"));
    //       }
    // }).sortable({
    //     items: '.imp-builder_row',
    //     connectWidth: '.imp-builder_stage',
    //     handle: '.imp-builder_row-block-move',
    //     placeholder: 'imp-builder_row-placeholder ui-corner-all',
    //     forcePlaceholderSize: true,
    //     helper: function (evt, ui) {
    //         return $(ui).clone().appendTo(".imp-builder_stage").show();
    //       }
    // })

    // row cloning
    $(document).on('click', '.imp-builder_row-block-clone', function(e) {
        e.preventDefault();
        var thisRow = $(this).closest('.imp-builder_row-widget');
        thisRow.clone().insertAfter(thisRow);
        mainApp.$root.animate({
            scrollTop: thisRow.next().offset().top - 150
        }, 1000)
    })
    
    // row deletion
    $(document).on('click', '.imp-builder_row-block-delete', function(e) {
        e.preventDefault();
        var remove = confirm("Do you really want to delete this row?");
        if(remove == true) {
            $(this).closest('.imp-builder_row-widget').remove();
        }
    })
}

// builder widget settings
var _builderWidgetSettings = function() {
    
    // get widget settings overlay template
    var widgetOverlayTemplate;
    $.ajax({
        url: 'js/widget-settings-templates/widget-settings-overlay.hbs',
        cache: true,
        success: function(data) {
            var source  = data;
            widgetOverlayTemplate  = Handlebars.compile(source);
        }               
    });  

    // append template on active widget
    $(document).on('mouseenter', '.imp-builder_stage>.imp-builder_row-widget', function() {
       $(this).append(widgetOverlayTemplate);
    })

    // delete template on widget mouseleave
    $(document).on('mouseleave', '.imp-builder_stage>.imp-builder_row-widget', function() {
        $(this).find('.imp-builder_widget-settings-overlay').remove();
    })

    // row settings
    var widgetSettingsTemplate;
    var widgetSettingsFlag = true;
    $.ajax({
        url: 'js/widget-settings-templates/row-widget.hbs',
        cache: true,
        success: function(data) {
            var source = data;
            widgetSettingsTemplate  = Handlebars.compile(source);
        }               
    });  

    $(document).on('click', '.imp-builder_row-block-settings', function(e) {
        e.preventDefault();
        if(widgetSettingsFlag) {
            $(this).closest('.imp-builder_row-widget').append(widgetSettingsTemplate);
            widgetSettingsFlag = false;
        }
    })
        
    // close widget settings lightbox
    $(document).on('click', '.close-widget-settings-btn', function(e) {
        e.preventDefault();
        $(this).closest('.imp-builder_settings-lightbox').remove();
        widgetSettingsFlag = true;
    })
}

// builder widget actions
var _builderWidgetActions = function() {

}

// tinymce
var _tinymce = function() {
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
}

$(document).ready(function () {
    _tooltips();
    _builderPageActions();
    _builderRowSettings();
    _builderWidgetSettings();
    _builderWidgetActions();
    _tinymce();

});