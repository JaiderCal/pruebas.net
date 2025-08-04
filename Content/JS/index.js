jQuery(document).ready(function ($) {
    //$(".scroll").click(function (event) {
    //    event.preventDefault();
    //    $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 900);
    //});

    $('.home_div_container .list_data_item').on('click', function (event) {
        loadSODetails($(this), event);
    });

    $('.home_div_container .list_data_item').keydown(function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode == '13') {
            loadSODetails($(this), event);
        }
    });
           
    var loadSODetails = function (that, event) {
        var idClick = that.attr('data-id');
        pageLoaderAction('show');

        // Change the background color of vertical list item
        $('.list_data_items').find('.list_data_item').each(function () {
            $(this).css({ "background-color": '' });
        });
        that.css({ "background-color": "#ddd" });

        $.ajax({
            url: '/Home/ServiceRequestDetails',
            type: 'GET',
            data: { id: idClick },
            success: function (result) {
                // Load the content into the correspondign div
                $(".home_list_item_page").html(result);
                pageLoaderAction('hide');
                if ($(window).width() < 900) {
                    $("div.home_list_item_page").show();
                    $('div.vertical_list').hide();
                    $('.nav_back').show();
                    adjustWidthsAndHeights();
                }
            }
        });
    }

    $('form#formLink div.section input[type=checkbox]').prev().css("margin-left", "20px");

    submitFormAction();
    //adjustListDataItemsHeight();
    mobileActions();
    homePageOnLoadClick();
    convertToLocalTime();
   
});

var homePageOnLoadClick = function () {
    if ($(window).width() > 1023) {
        $('.home_div_container .list_data_item:visible').eq(0).trigger('click');
    }
}

var adjustListDataItemsHeight = function () {
    var viewPortHeight = $(window).height();
    var topBarHeight = $('.top_bar').height();
    var listHeaderHeight = $('.list_header').height();
    var listFooterHeight = $('.list_footer').height();
    $('.vertical_list .list_data_items').height(viewPortHeight - (topBarHeight + listHeaderHeight + 10) - listFooterHeight);
    $('.home_list_item_page').css({ "height": (viewPortHeight - (topBarHeight + 10)) });
}

$(function () {
    //submitFormAction();
    accordionActions();
    anouncementActions();
    sideMenuAction();
    filterShow();
   
    $('div.top-menu').find('a[href="index.cshtml"]').attr({ "class": "active hvr-shutter-out-horizontal" });
});

mobileActions = function () {
    if ($(window).width() < 1024) {
        $('.list_item_page').hide();
        $('.home_list_item_page').hide();
        $('.vertical_list').css('width', '100%');
        $('.vertical_list .list_footer').css('width', '100%');
        $('.list_item_page').css({ 'width': '100%' });
        $('.home_list_item_page').css({ 'width': '100%' });
        backNavigation();
    } else {
        $('.list_item_page').css({ 'width': '' });
    }
}

var backNavigation = function () {
    $('body').on('click', '.nav_back', function (event) {
        $("div.home_list_item_page").hide();
        $('div.vertical_list').show();
        $('.nav_back').hide();
    });
}

sideMenuAction = function () {
    $('.side_menu').find('.side_nav_home').css('background-color', 'rgb(37, 95, 133)');
}


anouncementActions = function () {
    $('.main_body').on('click', '.anouncement_section .primary_row', function (event) {
        $('.main_body .anouncement_section .anouncement_desc').toggle();
        $('.main_body .anouncement_section .anouncement_info').toggle();
        $('.anouncement_section .accordion_icon span').toggleClass("icon-ChevronRight3Legacy icon-ChevronDown3Legacy");
    });


    $('.main_body').on('click', '.anouncement_section .icon-ChevronDown3Legacy', function (event) {
        $('.main_body .anouncement_section .anouncement_desc').toggle();
        $('.main_body .anouncement_section .anouncement_info').toggle();
        $('.anouncement_section .accordion_icon span').toggleClass("icon-ChevronRight3Legacy icon-ChevronDown3Legacy");
    });
}

accordionActions = function () {

    $('.home_div_container').on('click', '.section.closed .primary_row', function (event) {
        accordionToggle($(this));
    });
}

accordionToggle = function (primaryRow) {
    var section = primaryRow.closest('.section');
    $('.home_div_container .section').each(function () {
        $(this).find('.accordion_icon span').removeClass('icon-ChevronDown3Legacy').addClass('icon-ChevronRight3Legacy');
        $(this).find('.sub_row_container').slideUp();
        $(this).find('.see_all a').hide();
        $(this).addClass('closed');
    });

    if (section.hasClass('closed')) {
        section.find('.sub_row_container').slideDown();
        section.find('.accordion_icon span').addClass('icon-ChevronDown3Legacy').removeClass('icon-ChevronRight3Legacy');
        section.find('.see_all a').show();
        section.toggleClass('closed');

    } else {
        section.find('.accordion_icon span').removeClass('icon-ChevronDown3Legacy').addClass('icon-ChevronRight3Legacy');
        section.find('.sub_row_container').slideUp();
        section.find('.see_all a').hide();
        section.toggleClass('closed');
    }

}

submitFormAction = function () {
    $('.home_div_container').on('click', 'form#formLink', function (event) {
        $(this).submit();
    });
}

filterShow = function () {
    $('.home_div_container .vertical_list .filter_search').on('click', function (event) {
        $('#searchRequest').toggle();
    });
    $('.home_div_container .vertical_list .filter_search').keydown(function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode == '13') {
            $('#searchRequest').toggle();
        }
    });
}

pageLoaderAction = function (action) {
    var docHeight = $(document).height();
    var overlayDiv = $("<div id='overlay'></div>").height(docHeight);
    if (action == 'show') {
        $("body").append(overlayDiv);
        $('#page_loader').show();
    } else {
        $('#page_loader').hide();
        $("body #overlay").remove();
    }
}

convertToLocalTime = function () {
    $('.utc-date').each(function () {

        //Gat Date from input
        var text = $(this).html();

        var dateData = text.split(",")

        // We might be refromatting same date again in case of partial views, 
        // so only if date is in expected format ("yyyy,M,d,h,m,s"), then only proceed
        if (dateData.length == 6) {
            // Using new JavaScript Date(7 numbers), creates a new date object with the specified date and time:
            // The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order:
            var utcDate = new Date(dateData[0], // year
                dateData[1] - 1, // in JavaScript, January is month 0
                dateData[2], // Date
                dateData[3], // Hours
                dateData[4], // Minutes
                dateData[5], // Seconds
                0);          // Milli-Seconds

            var newDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000);

            //Replace Date with local String
            $(this).html(newDate.toLocaleString());
        }
    });
}





// SIG // Begin signature block
// SIG // MIIduAYJKoZIhvcNAQcCoIIdqTCCHaUCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFE0aKat6zAOl
// SIG // UR//75GVvZK/LMtPoIIYajCCBNowggPCoAMCAQICEzMA
// SIG // AAEhTrIDTT8kaTYAAAAAASEwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE4MTAyNDIx
// SIG // MDczOVoXDTIwMDExMDIxMDczOVowgcoxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVy
// SIG // aWNhIE9wZXJhdGlvbnMxJjAkBgNVBAsTHVRoYWxlcyBU
// SIG // U1MgRVNOOjhBODItRTM0Ri05RERBMSUwIwYDVQQDExxN
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIIBIjAN
// SIG // BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8OAL4/+m
// SIG // +qXuRcEvrHz2MGcuQv4zw6QkHzgDDoo5hqbuk+xFaVf2
// SIG // xo15JQRRJ/sSwIXeDqDS6Yf42Vwnsc3KHLtdqKeaJUZJ
// SIG // CMs72WeHlyb21Qg+eCYdBOa/ht/S5n++6gjS/4OAZrVB
// SIG // eic7rea/dV65LzTFfFGGA5MgE+aAL3j67msBrqx47Fvx
// SIG // Q9lXMp14BFgOpr0fBG7W2e8pccqFMiEop2Efw5wBmSBp
// SIG // j/TEqjDohqRi8EXFur88rE+qJ5096IHTheYC0/moSfoO
// SIG // tKetFavQukn5I3uwvXZO3/9Ces071tYWFeeKow7FywZf
// SIG // hyAG1baJXmvkn0aHVxFFfIZbfQIDAQABo4IBCTCCAQUw
// SIG // HQYDVR0OBBYEFHGevhS+zas6s3KOm7NHXnUhRcIuMB8G
// SIG // A1UdIwQYMBaAFCM0+NlSRnAK7UD7dvuzK7DDNbMPMFQG
// SIG // A1UdHwRNMEswSaBHoEWGQ2h0dHA6Ly9jcmwubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3RzL01pY3Jvc29m
// SIG // dFRpbWVTdGFtcFBDQS5jcmwwWAYIKwYBBQUHAQEETDBK
// SIG // MEgGCCsGAQUFBzAChjxodHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpL2NlcnRzL01pY3Jvc29mdFRpbWVTdGFt
// SIG // cFBDQS5jcnQwEwYDVR0lBAwwCgYIKwYBBQUHAwgwDQYJ
// SIG // KoZIhvcNAQEFBQADggEBAJm4QdJYOju+gNVM+/p9BVw5
// SIG // xJXv3jPyYjz5O6TV4qZviA2nFXZaYlG3WszDCDiJGUwM
// SIG // c1kmXM24JGrXyoS56AP7bSHwa8x9iV6aOAQpZp4YuYnG
// SIG // BuhDO5kKZSTuvq42ybEtTI0930nEIQEJ7/chHQZoN1WG
// SIG // rkrllooUrnW3hk7XZIYn4JTcEd5aP6pzH+cu0N+YE6U+
// SIG // +QjCu8vSAPmSydTBrSxLTVoRiSlbm8m8osl1YYg93mwj
// SIG // rjAA+U4wDpZ4fclP9WbwT/Ohwry4cVeNV9kD08VbHfaG
// SIG // joX1ybzJpC7nvp265kt1U37hdu/O9Hv2S1MUmLjmNIch
// SIG // 3TR8gpHX7LowggX/MIID56ADAgECAhMzAAABA14lHJkf
// SIG // ox64AAAAAAEDMA0GCSqGSIb3DQEBCwUAMH4xCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBD
// SIG // b2RlIFNpZ25pbmcgUENBIDIwMTEwHhcNMTgwNzEyMjAw
// SIG // ODQ4WhcNMTkwNzI2MjAwODQ4WjB0MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMR4wHAYDVQQDExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK
// SIG // AoIBAQDRlHY25oarNv5p+UZ8i4hQy5Bwf7BVqSQdfjnn
// SIG // BZ8PrHuXss5zCvvUmyRcFrU53Rt+M2wR/Dsm85iqXVNr
// SIG // qsPsE7jS789Xf8xly69NLjKxVitONAeJ/mkhvT5E+94S
// SIG // nYW/fHaGfXKxdpth5opkTEbOttU6jHeTd2chnLZaBl5H
// SIG // hvU80QnKDT3NsumhUHjRhIjiATwi/K+WCMxdmcDt66Va
// SIG // mJL1yEBOanOv3uN0etNfRpe84mcod5mswQ4xFo8ADwH+
// SIG // S15UD8rEZT8K46NG2/YsAzoZvmgFFpzmfzS/p4eNZTkm
// SIG // yWPU78XdvSX+/Sj0NIZ5rCrVXzCRO+QUauuxygQjAgMB
// SIG // AAGjggF+MIIBejAfBgNVHSUEGDAWBgorBgEEAYI3TAgB
// SIG // BggrBgEFBQcDAzAdBgNVHQ4EFgQUR77Ay+GmP/1l1jjy
// SIG // A123r3f3QP8wUAYDVR0RBEkwR6RFMEMxKTAnBgNVBAsT
// SIG // IE1pY3Jvc29mdCBPcGVyYXRpb25zIFB1ZXJ0byBSaWNv
// SIG // MRYwFAYDVQQFEw0yMzAwMTIrNDM3OTY1MB8GA1UdIwQY
// SIG // MBaAFEhuZOVQBdOCqhc3NyK1bajKdQKVMFQGA1UdHwRN
// SIG // MEswSaBHoEWGQ2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvY3JsL01pY0NvZFNpZ1BDQTIwMTFfMjAx
// SIG // MS0wNy0wOC5jcmwwYQYIKwYBBQUHAQEEVTBTMFEGCCsG
// SIG // AQUFBzAChkVodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpb3BzL2NlcnRzL01pY0NvZFNpZ1BDQTIwMTFfMjAx
// SIG // MS0wNy0wOC5jcnQwDAYDVR0TAQH/BAIwADANBgkqhkiG
// SIG // 9w0BAQsFAAOCAgEAn/XJUw0/DSbsokTYDdGfY5YGSz8e
// SIG // XMUzo6TDbK8fwAG662XsnjMQD6esW9S9kGEX5zHnwya0
// SIG // rPUn00iThoj+EjWRZCLRay07qCwVlCnSN5bmNf8MzsgG
// SIG // FhaeJLHiOfluDnjYDBu2KWAndjQkm925l3XLATutghIW
// SIG // IoCJFYS7mFAgsBcmhkmvzn1FFUM0ls+BXBgs1JPyZ6vi
// SIG // c8g9o838Mh5gHOmwGzD7LLsHLpaEk0UoVFzNlv2g24HY
// SIG // tjDKQ7HzSMCyRhxdXnYqWJ/U7vL0+khMtWGLsIxB6aq4
// SIG // nZD0/2pCD7k+6Q7slPyNgLt44yOneFuybR/5WcF9ttE5
// SIG // yXnggxxgCto9sNHtNr9FB+kbNm7lPTsFA6fUpyUSj+Z2
// SIG // oxOzRVpDMYLa2ISuubAfdfX2HX1RETcn6LU1hHH3V6qu
// SIG // +olxyZjSnlpkdr6Mw30VapHxFPTy2TUxuNty+rR1yIib
// SIG // ar+YRcdmstf/zpKQdeTr5obSyBvbJ8BblW9Jb1hdaSre
// SIG // U0v46Mp79mwV+QMZDxGFqk+av6pX3WDG9XEg9FGomsrp
// SIG // 0es0Rz11+iLsVT9qGTlrEOlaP470I3gwsvKmOMs1jaqY
// SIG // WSRAuDpnpAdfoP7YO0kT+wzh7Qttg1DO8H8+4NkI6Iwh
// SIG // SkHC3uuOW+4Dwx1ubuZUNWZncnwa6lL2IsRyP64wggYH
// SIG // MIID76ADAgECAgphFmg0AAAAAAAcMA0GCSqGSIb3DQEB
// SIG // BQUAMF8xEzARBgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJ
// SIG // kiaJk/IsZAEZFgltaWNyb3NvZnQxLTArBgNVBAMTJE1p
// SIG // Y3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0
// SIG // eTAeFw0wNzA0MDMxMjUzMDlaFw0yMTA0MDMxMzAzMDla
// SIG // MHcxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xITAfBgNVBAMTGE1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQTCCASIwDQYJKoZI
// SIG // hvcNAQEBBQADggEPADCCAQoCggEBAJ+hbLHf20iSKnxr
// SIG // LhnhveLjxZlRI1Ctzt0YTiQP7tGn0UytdDAgEesH1VSV
// SIG // FUmUG0KSrphcMCbaAGvoe73siQcP9w4EmPCJzB/LMySH
// SIG // nfL0Zxws/HvniB3q506jocEjU8qN+kXPCdBer9CwQgSi
// SIG // +aZsk2fXKNxGU7CG0OUoRi4nrIZPVVIM5AMs+2qQkDBu
// SIG // h/NZMJ36ftaXs+ghl3740hPzCLdTbVK0RZCfSABKR2YR
// SIG // JylmqJfk0waBSqL5hKcRRxQJgp+E7VV4/gGaHVAIhQAQ
// SIG // MEbtt94jRrvELVSfrx54QTF3zJvfO4OToWECtR0Nsfz3
// SIG // m7IBziJLVP/5BcPCIAsCAwEAAaOCAaswggGnMA8GA1Ud
// SIG // EwEB/wQFMAMBAf8wHQYDVR0OBBYEFCM0+NlSRnAK7UD7
// SIG // dvuzK7DDNbMPMAsGA1UdDwQEAwIBhjAQBgkrBgEEAYI3
// SIG // FQEEAwIBADCBmAYDVR0jBIGQMIGNgBQOrIJgQFYnl+Ul
// SIG // E/wq4QpTlVnkpKFjpGEwXzETMBEGCgmSJomT8ixkARkW
// SIG // A2NvbTEZMBcGCgmSJomT8ixkARkWCW1pY3Jvc29mdDEt
// SIG // MCsGA1UEAxMkTWljcm9zb2Z0IFJvb3QgQ2VydGlmaWNh
// SIG // dGUgQXV0aG9yaXR5ghB5rRahSqClrUxzWPQHEy5lMFAG
// SIG // A1UdHwRJMEcwRaBDoEGGP2h0dHA6Ly9jcmwubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3RzL21pY3Jvc29m
// SIG // dHJvb3RjZXJ0LmNybDBUBggrBgEFBQcBAQRIMEYwRAYI
// SIG // KwYBBQUHMAKGOGh0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2kvY2VydHMvTWljcm9zb2Z0Um9vdENlcnQuY3J0
// SIG // MBMGA1UdJQQMMAoGCCsGAQUFBwMIMA0GCSqGSIb3DQEB
// SIG // BQUAA4ICAQAQl4rDXANENt3ptK132855UU0BsS50cVtt
// SIG // DBOrzr57j7gu1BKijG1iuFcCy04gE1CZ3XpA4le7r1ia
// SIG // HOEdAYasu3jyi9DsOwHu4r6PCgXIjUji8FMV3U+rkuTn
// SIG // jWrVgMHmlPIGL4UD6ZEqJCJw+/b85HiZLg33B+JwvBhO
// SIG // nY5rCnKVuKE5nGctxVEO6mJcPxaYiyA/4gcaMvnMMUp2
// SIG // MT0rcgvI6nA9/4UKE9/CCmGO8Ne4F+tOi3/FNSteo7/r
// SIG // vH0LQnvUU3Ih7jDKu3hlXFsBFwoUDtLaFJj1PLlmWLMt
// SIG // L+f5hYbMUVbonXCUbKw5TNT2eb+qGHpiKe+imyk0Bnca
// SIG // Ysk9Hm0fgvALxyy7z0Oz5fnsfbXjpKh0NbhOxXEjEiZ2
// SIG // CzxSjHFaRkMUvLOzsE1nyJ9C/4B5IYCeFTBm6EISXhrI
// SIG // niIh0EPpK+m79EjMLNTYMoBMJipIJF9a6lbvpt6Znco6
// SIG // b72BJ3QGEe52Ib+bgsEnVLaxaj2JoXZhtG6hE6a/qkfw
// SIG // Em/9ijJssv7fUciMI8lmvZ0dhxJkAj0tr1mPuOQh5bWw
// SIG // ymO0eFQF1EEuUKyUsKV4q7OglnUa2ZKHE3UiLzKoCG6g
// SIG // W4wlv6DvhMoh1useT8ma7kng9wFlb4kLfchpyOZu6qeX
// SIG // zjEp/w7FW1zYTRuh2Povnj8uVRZryROj/TCCB3owggVi
// SIG // oAMCAQICCmEOkNIAAAAAAAMwDQYJKoZIhvcNAQELBQAw
// SIG // gYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMTKU1p
// SIG // Y3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0
// SIG // eSAyMDExMB4XDTExMDcwODIwNTkwOVoXDTI2MDcwODIx
// SIG // MDkwOVowfjELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYGA1UE
// SIG // AxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQQ0EgMjAx
// SIG // MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIB
// SIG // AKvw+nIQHC6t2G6qghBNNLrytlghn0IbKmvpWlCquAY4
// SIG // GgRJun/DDB7dN2vGEtgL8DjCmQawyDnVARQxQtOJDXlk
// SIG // h36UYCRsr55JnOloXtLfm1OyCizDr9mpK656Ca/XllnK
// SIG // YBoF6WZ26DJSJhIv56sIUM+zRLdd2MQuA3WraPPLbfM6
// SIG // XKEW9Ea64DhkrG5kNXimoGMPLdNAk/jj3gcN1Vx5pUkp
// SIG // 5w2+oBN3vpQ97/vjK1oQH01WKKJ6cuASOrdJXtjt7UOR
// SIG // g9l7snuGG9k+sYxd6IlPhBryoS9Z5JA7La4zWMW3Pv4y
// SIG // 07MDPbGyr5I4ftKdgCz1TlaRITUlwzluZH9TupwPrRkj
// SIG // hMv0ugOGjfdf8NBSv4yUh7zAIXQlXxgotswnKDglmDlK
// SIG // Ns98sZKuHCOnqWbsYR9q4ShJnV+I4iVd0yFLPlLEtVc/
// SIG // JAPw0XpbL9Uj43BdD1FGd7P4AOG8rAKCX9vAFbO9G9RV
// SIG // S+c5oQ/pI0m8GLhEfEXkwcNyeuBy5yTfv0aZxe/CHFfb
// SIG // g43sTUkwp6uO3+xbn6/83bBm4sGXgXvt1u1L50kppxMo
// SIG // pqd9Z4DmimJ4X7IvhNdXnFy/dygo8e1twyiPLI9AN0/B
// SIG // 4YVEicQJTMXUpUMvdJX3bvh4IFgsE11glZo+TzOE2rCI
// SIG // F96eTvSWsLxGoGyY0uDWiIwLAgMBAAGjggHtMIIB6TAQ
// SIG // BgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQUSG5k5VAF
// SIG // 04KqFzc3IrVtqMp1ApUwGQYJKwYBBAGCNxQCBAweCgBT
// SIG // AHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB/wQF
// SIG // MAMBAf8wHwYDVR0jBBgwFoAUci06AjGQQ7kUBU7h6qfH
// SIG // MdEjiTQwWgYDVR0fBFMwUTBPoE2gS4ZJaHR0cDovL2Ny
// SIG // bC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMv
// SIG // TWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNybDBe
// SIG // BggrBgEFBQcBAQRSMFAwTgYIKwYBBQUHMAKGQmh0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMvTWlj
// SIG // Um9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNydDCBnwYD
// SIG // VR0gBIGXMIGUMIGRBgkrBgEEAYI3LgMwgYMwPwYIKwYB
// SIG // BQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvZG9jcy9wcmltYXJ5Y3BzLmh0bTBABggrBgEF
// SIG // BQcCAjA0HjIgHQBMAGUAZwBhAGwAXwBwAG8AbABpAGMA
// SIG // eQBfAHMAdABhAHQAZQBtAGUAbgB0AC4gHTANBgkqhkiG
// SIG // 9w0BAQsFAAOCAgEAZ/KGpZjgVHkaLtPYdGcimwuWEeFj
// SIG // kplCln3SeQyQwWVfLiw++MNy0W2D/r4/6ArKO79HqaPz
// SIG // adtjvyI1pZddZYSQfYtGUFXYDJJ80hpLHPM8QotS0LD9
// SIG // a+M+By4pm+Y9G6XUtR13lDni6WTJRD14eiPzE32mkHSD
// SIG // jfTLJgJGKsKKELukqQUMm+1o+mgulaAqPyprWEljHwlp
// SIG // blqYluSD9MCP80Yr3vw70L01724lruWvJ+3Q3fMOr5ko
// SIG // l5hNDj0L8giJ1h/DMhji8MUtzluetEk5CsYKwsatruWy
// SIG // 2dsViFFFWDgycScaf7H0J/jeLDogaZiyWYlobm+nt3TD
// SIG // QAUGpgEqKD6CPxNNZgvAs0314Y9/HG8VfUWnduVAKmWj
// SIG // w11SYobDHWM2l4bf2vP48hahmifhzaWX0O5dY0HjWwec
// SIG // hz4GdwbRBrF1HxS+YWG18NzGGwS+30HHDiju3mUv7Jf2
// SIG // oVyW2ADWoUa9WfOXpQlLSBCZgB/QACnFsZulP0V3HjXG
// SIG // 0qKin3p6IvpIlR+r+0cjgPWe+L9rt0uX4ut1eBrs6jeZ
// SIG // eRhL/9azI2h15q/6/IvrC4DqaTuv/DDtBEyO3991bWOR
// SIG // PdGdVk5Pv4BXIqF4ETIheu9BCrE/+6jMpF3BoYibV3FW
// SIG // TkhFwELJm3ZbCoBIa/15n8G9bW1qyVJzEw16UM0xggS6
// SIG // MIIEtgIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEGA1UE
// SIG // CBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEe
// SIG // MBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSgw
// SIG // JgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5nIFBD
// SIG // QSAyMDExAhMzAAABA14lHJkfox64AAAAAAEDMAkGBSsO
// SIG // AwIaBQCggc4wGQYJKoZIhvcNAQkDMQwGCisGAQQBgjcC
// SIG // AQQwHAYKKwYBBAGCNwIBCzEOMAwGCisGAQQBgjcCARUw
// SIG // IwYJKoZIhvcNAQkEMRYEFCKNKcfssHMfCB+U81B8zvyb
// SIG // KioKMG4GCisGAQQBgjcCAQwxYDBeoECAPgBTAHkAcwB0
// SIG // AGUAbQAgAEMAZQBuAHQAZQByACAALQAgAFMAZQByAHYA
// SIG // aQBjAGUAIABNAGEAbgBhAGcAZQByoRqAGGh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASC
// SIG // AQBdA5/mEAkCwbvPU3Q4jNpyfiI7o0OyjmzV8mmQqN2t
// SIG // XIPLwoY935rkbHY3kBXgWPqhkg3jlg313iQthmJ5+uKz
// SIG // h81+i/Iyi7joI5fa56tQ2uZIkSlLKppkiUCLkTSmbz5n
// SIG // CDBOc51T9sMCIjIy5rZmUR9ceS3KznUtBNwQlbLsnrOo
// SIG // kB/FDprBjST7dreg5OQQrwawO7DeQDKKiZYwnJzhZ+V3
// SIG // MNsybFg0x0z9WX+Vxq8atHJDZdPPVZ1SlPxxFl7bMVGo
// SIG // 5hVzfkrOZjz7ddGQRHgGXjoIn0WJbV6EBLPTu6Z3ybXC
// SIG // aRI3G0t7tw8Kpio1rWdkW4w9m2JTduZTO/lwoYICKDCC
// SIG // AiQGCSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29m
// SIG // dCBUaW1lLVN0YW1wIFBDQQITMwAAASFOsgNNPyRpNgAA
// SIG // AAABITAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsG
// SIG // CSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTkwMTI4
// SIG // MTkwNzA1WjAjBgkqhkiG9w0BCQQxFgQU7ZR6iIoPuZqs
// SIG // vlvAA9qiqMNDM8UwDQYJKoZIhvcNAQEFBQAEggEAIYdr
// SIG // 5kVoTP4zznk9DmD+pz5XtgXAxDzJCw9IDS5+LJVuVy/C
// SIG // /PU1n7cJh8G+ofo5/PHLu/XqAqskvWab0KFPxbkMBCH8
// SIG // HsaE9FVfvFYGJKfMDEcUNQ5qwqb+A8lLbJC56n/pqeGr
// SIG // Zn7UMQBVaSVz6XvcehFeUeJQ9R2crqRyN9515JC4r778
// SIG // ARe4MagA1v/hlvM4cd+eBaIrfulxqAXu8ssNYihbTVNh
// SIG // JXVyD4camBjHIC3A6Fi82Ltie/7WTLJWzxnN3RIZUi4C
// SIG // O3riEBSF0amXiKOeWsZMCfyG4B1254LSfVkgclfdjSW4
// SIG // hGDoFmn22tARAHZWu5IePSB6u9eX4w==
// SIG // End signature block
