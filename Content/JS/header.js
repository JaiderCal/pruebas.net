jQuery(document).ready(function ($) {
    //var defaultSelect = '#Culture option[value="'+ 'Session["Culture"]' + '"]';
    //$(defaultSelect).attr({ 'selected': 'selected' });
    var DefaultLanguage = '@Session["Culture"]';
    $.each($('#Culture option'), function () {
        if ($(this).attr('value').includes(DefaultLanguage))
            $(this).attr({ 'selected': 'selected' });
    });
    mobileHeaderActions();
    anouncementShowAction();
    userInfoAction();
    langAction();
    topBarMenuCloseActions();
    langChangeAction();
    selectedLangHighlight();
    mobileAdjustments();
    searchButtonEvent();
});

var mobileAdjustments = function () {
    var width = $(window).width();
    if (width < 786) {
        modifyAnouncementUI();
    }
}


var modifyAnouncementUI = function () {
    var anouncementMainDiv = $('.anouncement_section');
    anouncementMainDiv.find('.heading').remove();
    anouncementMainDiv.find('.anouncement_content .sub_row div').removeClass().css({ 'margin-bottom': '1em', 'padding-left': '2em' });
    anouncementMainDiv.find('.anouncement_content .sub_row').find('div:first').addClass('col').css({ 'width': '2em', 'padding-left': '' });
}

var selectedLangHighlight = function () {
    var ulElm = $('.top_bar ul.lang_menu');
    var currLang = ulElm.attr('data-select-lang');
    ulElm.find('li').removeClass('selected');
    ulElm.find("li[value=" + currLang + "]").addClass("selected");
}

var langChangeAction = function () {
    $('ul.lang_menu li').on('click', function (event) {
        var value = $(this).attr('value');
        $('form#langForm').find('input#selectLang').attr('value', value);
        $('form#langForm').find('input#currentUrl').attr('value', window.location.href);
        $('form#langForm').submit();
    });

    $('ul.lang_menu li').keydown(function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode == '13') {
            var value = $(this).attr('value');
            $('form#langForm').find('input#selectLang').attr('value', value);
            $('form#langForm').find('input#currentUrl').attr('value', window.location.href);
            $('form#langForm').submit();
        }
    });
}

var topBarMenuCloseActions = function () {
    $(document).on('click', function (event) {
        var topBar = $('.top_bar');
        closeUsername(topBar);
        closeLangMenu(topBar);
        closeAnouncements(topBar);
});

}


var closeAnouncements = function (topBar) {
    topBar.find('.anouncements').removeClass('clicked');
    topBar.find('.anouncements').find('.anouncement_count').show();
    topBar.find('.anouncements').find('.anouncement-icon').removeClass("icon-ActionCenter").addClass("icon-ActionCenterNotification");
    $('.main_body .anouncement_section').hide();
}

var closeLangMenu = function (topBar) {
    topBar.find('.lang').removeClass('clicked');
    topBar.find('.lang').find('.lang_setting').hide();
    topBar.find('.lang').find('.lang_menu').hide();

}

var closeUsername = function ( topBar) {
    var emailDiv = topBar.find('.email');
    emailDiv.removeClass('clicked');
    emailDiv.find('.username').hide();
}

var mobileHeaderActions = function () {
    var width = $(window).width();
    if (width < 786) {
        $('body').find('.top_bar .logo').addClass("span_11").removeClass("span_15");
    } else {
        $('body').find('.top_bar .logo').addClass("span_15").removeClass("span_11");
    }
}

var anouncementShowAction = function () {
    var topBar = $('.top_bar');
    topBar.on('click', '.anouncements', function (event) {
        event.stopPropagation();
        $(this).toggleClass('clicked');
        $(this).find('.anouncement_count').toggle();
        $(this).find('.anouncement-icon').toggleClass("icon-ActionCenter icon-ActionCenterNotification");
        $('.main_body .anouncement_section').toggle();
        closeLangMenu(topBar);
        closeUsername(topBar);
    });

    $('.top_bar .anouncements').keydown(function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode == '13') {
            event.stopPropagation();
            $(this).toggleClass('clicked');
            $(this).find('.anouncement_count').toggle();
            $(this).find('.anouncement-icon').toggleClass("icon-ActionCenter icon-ActionCenterNotification");
            $('.main_body .anouncement_section').toggle();
            closeLangMenu(topBar);
            closeUsername(topBar);
        }
    });
}

var searchButtonEvent = function () {
    $('.top_bar').on('click', '.mobile_search', function (event) {
        $(this).toggleClass('clicked');
        $('.mobile_global_search').toggle();
    });
}

var userInfoAction = function () {
    var topBar = $('.top_bar');
    topBar.on('click', '.email', function (event) {
        event.stopPropagation();
        $(this).toggleClass('clicked');
        $(this).find('.username').toggle();
        closeLangMenu(topBar);
        closeAnouncements(topBar);
    });

    $('.top_bar .email').keydown(function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode == '13') {
            event.stopPropagation();
            $(this).toggleClass('clicked');
            $(this).find('.username').toggle();
            closeLangMenu(topBar);
            closeAnouncements(topBar);
        }
    });
}

var langAction = function () {
    var topBar = $('.top_bar');
    topBar.on('click', '.lang', function (event) {
        event.stopPropagation();
        $(this).toggleClass('clicked');
        $(this).find('.lang_setting').toggle();
        $(this).find('.lang_menu').toggle();
        closeUsername(topBar);
        closeAnouncements(topBar);
    });
    $('.top_bar .lang').keydown(function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode == '13') {
            event.stopPropagation();
            $(this).toggleClass('clicked');
            $(this).find('.lang_setting').toggle();
            $(this).find('.lang_menu').toggle();
            closeUsername(topBar);
            closeAnouncements(topBar);
        }
    });
}
// SIG // Begin signature block
// SIG // MIIduAYJKoZIhvcNAQcCoIIdqTCCHaUCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFHUbOu4HfCBM
// SIG // xIPdCc9chtZnux7uoIIYajCCBNowggPCoAMCAQICEzMA
// SIG // AAEiJ+9r7eL7oKMAAAAAASIwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE4MTAyNDIx
// SIG // MDc0MFoXDTIwMDExMDIxMDc0MFowgcoxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVy
// SIG // aWNhIE9wZXJhdGlvbnMxJjAkBgNVBAsTHVRoYWxlcyBU
// SIG // U1MgRVNOOkVBQ0UtRTMxNi1DOTFEMSUwIwYDVQQDExxN
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIIBIjAN
// SIG // BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0VNLh699
// SIG // Fy8z9KGU1u3wnbJW+jl00HqAmvyKas04A3F8nxKiNH3b
// SIG // 4bakPOJ3mROL8CVAGydkvmoyYq882SBFPyYk2aSYHngD
// SIG // LTfjLgG8163ckqIclA7hpLjfr1UngpxGZHhnBX/86zVl
// SIG // l5kuybFStgSUfGL15NLAVG1laXY9Lr8+vGPh1MsfACih
// SIG // Npx0bueH+nwuHosD/4bPi+zXoyZvrDaOx11eGOnnUCN+
// SIG // hXWNEqLavOy4d1PelODul/XA9Iqisa+JcWGJIffAM1VI
// SIG // 4oknVlLeuQwDG3YwVenHqWrcFVaBExLTSv3/N2zEt7Di
// SIG // 9NEDFqMkDNRe/ny6M9Uxe6paMwIDAQABo4IBCTCCAQUw
// SIG // HQYDVR0OBBYEFLZRVZZJFCrl57hdyWcXw5R7NqWmMB8G
// SIG // A1UdIwQYMBaAFCM0+NlSRnAK7UD7dvuzK7DDNbMPMFQG
// SIG // A1UdHwRNMEswSaBHoEWGQ2h0dHA6Ly9jcmwubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3RzL01pY3Jvc29m
// SIG // dFRpbWVTdGFtcFBDQS5jcmwwWAYIKwYBBQUHAQEETDBK
// SIG // MEgGCCsGAQUFBzAChjxodHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpL2NlcnRzL01pY3Jvc29mdFRpbWVTdGFt
// SIG // cFBDQS5jcnQwEwYDVR0lBAwwCgYIKwYBBQUHAwgwDQYJ
// SIG // KoZIhvcNAQEFBQADggEBAGZXbHe7444uVN9GY3Coib4Q
// SIG // 7XJsdG+LOLNBO4HfC6eFZ7wEAJ6XN0pJJ1LJcpJ7xxhO
// SIG // +zkncSnazvKp509E8pqr3+/0XtsSXEVXDOH/E3hOYQmn
// SIG // 3wpAexrbvdEfuvhG9QZwQ2DG492+NiavCuNoZwxtJ7a4
// SIG // L+P05siViL5hkDkVjAlsjPza2mNy3Yu6Q6U38fWfbOHj
// SIG // RP3MYqaEk1xzCID4A4G2XLhQQDZ1sBfv7MI+vXL/O8fi
// SIG // b//BzPzWqGsK6/PtMg44ifdDsyxiOUUnLhn0FJR9BEm8
// SIG // 3rzv/TxaaFMsJjWIR6BD54CyVU9lustd4xVMdyEvZZ0d
// SIG // K9XQoZspwfIwggX/MIID56ADAgECAhMzAAABA14lHJkf
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
// SIG // IwYJKoZIhvcNAQkEMRYEFCGJtNujx2cfBBzY0HVgo3mk
// SIG // jc6mMG4GCisGAQQBgjcCAQwxYDBeoECAPgBTAHkAcwB0
// SIG // AGUAbQAgAEMAZQBuAHQAZQByACAALQAgAFMAZQByAHYA
// SIG // aQBjAGUAIABNAGEAbgBhAGcAZQByoRqAGGh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASC
// SIG // AQBZdlJzj1eX4yWgT7wGhkV7iT6Nmml6DNm/2MNBLwKu
// SIG // uiAdXG4foCBKIaK4vQ75ITHuotX5ZSqW9eQcv5iLgBxB
// SIG // r5kGvuYx8yhJR2krOC5I+x+5wOkwt0AcapBBqNwj0IGw
// SIG // AKRkhEnIrnI0LsKq9JRO2Wftd00EtiY4hKOEMBQvK1Gz
// SIG // ZNj/t290NduYrenFntUEF+DR5oHoaip1sydjZUt5CH1r
// SIG // FXGn6ub7Vmq59nDQeG7dKtBxknethFhTKMrg8PRh82KI
// SIG // /ossivYOHtzv6m/BUNzVhc3iR1ITLvca/s+fEwmYk+lM
// SIG // pE5wjHWTxfRyVPmMxcssHhLKRFq8RGy+vs5LoYICKDCC
// SIG // AiQGCSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29m
// SIG // dCBUaW1lLVN0YW1wIFBDQQITMwAAASIn72vt4vugowAA
// SIG // AAABIjAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsG
// SIG // CSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTkwMTI4
// SIG // MTkwNzA2WjAjBgkqhkiG9w0BCQQxFgQUOm3JyZx5oOlJ
// SIG // rEZNbileiymB/8EwDQYJKoZIhvcNAQEFBQAEggEAY4xT
// SIG // AXDGnKlLtAEQWm1EO2PIP50kMJWyLXKnw1EuFbwLz9BY
// SIG // +7z2IlMZIbfnBdRh+g+PLJ1XvIbUaE9Is9yfx6R0uua0
// SIG // CskVw4mjqapCHh1yvTorkvdmhUySlyplE7EAEQLd8x8e
// SIG // cYd1XBYg8JJ8FmNbIW3fjojM3rUSvl4Wvqtsksa7KTZa
// SIG // bF31HReaj/5rA3ezB5cIoysFfKfrDbnz2AXNbBZ36IPz
// SIG // MRJVHTtih+f4xdLYwR3qDS3FhIQn0S9Ho1e1oDhuISVn
// SIG // dapheUeNJ7T5d3AQbHImA6GyLx/jnQ7ukJHiMWj02dnm
// SIG // six78leGubj84hnwG6Gy4xwTSSlW7A==
// SIG // End signature block
