// ==UserScript==
// @name         WordPress Config Auto Modifier
// @version      1.0.1
// @description  Tự động thay đổi nội dung input trên trang cài đặt nâng cao cho WordPress và Flatsome Theme
// @author       HungNth
// @homepage     https://github.com/HungNth/userscripts
// @match        *://*/wp-admin*
// @match        *://*/*/wp-admin*
// @icon         https://www.google.com/s2/favicons?domain=wordpress.org
// ==/UserScript==

(function () {

    function submitBtn(query) {
        const submitBtn = document.querySelector(query);
        const changeBtn = document.createElement("button");

        changeBtn.innerHTML = "Thay đổi";
        changeBtn.style.zIndex = 1000;
        changeBtn.style.padding = "10px";
        changeBtn.style.backgroundColor = "#0073aa";
        changeBtn.style.color = "#fff";
        changeBtn.style.border = "none";
        changeBtn.style.borderRadius = "5px";
        changeBtn.style.cursor = "pointer";
        changeBtn.style.marginLeft = "20px";

        if (submitBtn) {
            submitBtn.appendChild(changeBtn);
        }

        return changeBtn;
    }

    if (window.location.href.indexOf("/wp-admin/options-general.php") > -1) {
        const wpLang = document.querySelector('select[name="WPLANG"]');
        const timezone = document.querySelector('select[name="timezone_string"]');
        const dateFormat = document.querySelector('input[name="date_format"][value="d/m/Y"]');
        const timeFormat = document.querySelector('input[name="time_format"][value="H:i"]');
        const weekStart = document.querySelector('select[name="start_of_week"]');

        const changeBtn = submitBtn('.submit');

        changeBtn.onclick = function (e) {
            e.preventDefault();

            // Tự động đổi các trường cấu hình chung
            if (wpLang) wpLang.value = "vi";
            if (timezone) timezone.value = "Asia/Ho_Chi_Minh";
            if (dateFormat) dateFormat.checked = true;
            if (timeFormat) timeFormat.checked = true;
            if (weekStart) weekStart.value = "1"; // 1 = Monday trong WordPress
        }

    }

    if (window.location.href.indexOf("/wp-admin/options-reading.php") > -1) {
        const postPerPage = document.querySelector('input[name="posts_per_page"]');
        const postPerRSS = document.querySelector('input[name="posts_per_rss"]');
        const excerpt = document.querySelector('input[name="rss_use_excerpt"][value="1"]');

        const changeBtn = submitBtn('.submit');

        changeBtn.onclick = function (e) {
            e.preventDefault();
            postPerPage.value = "30";
            postPerRSS.value = "210";
            excerpt.checked = true;
        }
    }

    if (window.location.href.indexOf("/wp-admin/options-discussion.php") > -1) {
        const pingbackFlag = document.querySelector('input[name="default_pingback_flag"]');
        const pingStatus = document.querySelector('input[name="default_ping_status"]');
        const commentStatus = document.querySelector('input[name="default_comment_status"]');
        const commentMod = document.querySelector('input[name="comment_moderation"]');
        const avatar = document.querySelector('input[name="avatar_default"][value="identicon"]');

        const changeBtn = submitBtn('.submit');

        changeBtn.onclick = function (e) {
            e.preventDefault();

            pingbackFlag.value = "0";
            pingbackFlag.checked = false;
            pingStatus.value = "0";
            pingStatus.checked = false;
            commentStatus.value = "0";
            commentStatus.checked = false;
            commentMod.value = "1";
            commentMod.checked = true;
            avatar.checked = true;
        };
    }

    if (window.location.href.indexOf("/wp-admin/options-media.php") > -1) {
        const thumbSizeW = document.querySelector('input[name="thumbnail_size_w"]');
        const thumbSizeH = document.querySelector('input[name="thumbnail_size_h"]');
        const thumbCrop = document.querySelector('input[name="thumbnail_crop"]');
        const mediumSizeW = document.querySelector('input[name="medium_size_w"]');
        const mediumSizeH = document.querySelector('input[name="medium_size_h"]');
        const largeSizeW = document.querySelector('input[name="large_size_w"]');
        const largeSizeH = document.querySelector('input[name="large_size_h"]');

        const changeBtn = submitBtn('.submit');

        changeBtn.onclick = function (e) {
            e.preventDefault();

            thumbCrop.value = "0";
            thumbCrop.checked = false;
            thumbSizeW.value = "";
            thumbSizeH.value = "";
            mediumSizeW.value = "";
            mediumSizeH.value = "";
            largeSizeW.value = "";
            largeSizeH.value = "";
        }
    }

    if (window.location.href.indexOf("/wp-admin/options-permalink.php") > -1) {
        const customSelectionRadio = document.querySelector('input[name="selection"][value="custom"]');
        const structure = document.querySelector('input[name="permalink_structure"]');
        const changeBtn = submitBtn('.submit');

        changeBtn.onclick = function (e) {
            e.preventDefault();

            customSelectionRadio.checked = true;
            structure.value = "/%category%/%postname%/";
        }
    }

    ////////////////////////////////////
    // Flatsome
    ////////////////////////////////////
    if (window.location.href.indexOf("/wp-admin/admin.php?page=optionsframework") > -1) {
        const emoji = document.querySelector('input#disable_emoji[value="1"]');
        const blockCss = document.querySelector('input#disable_blockcss[value="1"]');
        const jqueryMigrate = document.querySelector('input#jquery_migrate[value="1"]');

        console.log(emoji, blockCss, jqueryMigrate);

        const changeBtn = submitBtn('.save_bar');
        changeBtn.onclick = function (e) {
            e.preventDefault();
            // emoji.value = "1";
            emoji.checked = true;
            // blockCss.value = "0";
            blockCss.checked = true;
            // jqueryMigrate.value = "0";
            jqueryMigrate.checked = true;
        }
    }

    ////////////////////////////////////
    // Woocommerce
    ////////////////////////////////////
    if (window.location.href.indexOf("/wp-admin/admin.php?page=wc-settings&tab=advanced") > -1) {
        const woocommerceAdvancedTab = {
            "woocommerce_checkout_pay_endpoint": "thanh-toan",
            "woocommerce_checkout_order_received_endpoint": "don-hang-da-nhan",
            "woocommerce_myaccount_add_payment_method_endpoint": "them-phuong-thuc-thanh-toan",
            "woocommerce_myaccount_delete_payment_method_endpoint": "xoa-phuong-thuc-thanh-toan",
            "woocommerce_myaccount_set_default_payment_method_endpoint": "cai-dat-phuong-thuc-thanh-toan-mac-dinh",
            "woocommerce_myaccount_orders_endpoint": "don-hang",
            "woocommerce_myaccount_view_order_endpoint": "xem-don-hang",
            "woocommerce_myaccount_downloads_endpoint": "tep-tai-xuong",
            "woocommerce_myaccount_edit_account_endpoint": "sua-tai-khoan",
            "woocommerce_myaccount_edit_address_endpoint": "sua-dia-chi",
            "woocommerce_myaccount_payment_methods_endpoint": "phuong-thuc-thanh-toan",
            "woocommerce_myaccount_lost_password_endpoint": "quen-mat-khau",
            "woocommerce_logout_endpoint": "dang-xuat",
        }

        const changeBtn = submitBtn('.submit');
        changeBtn.onclick = function (e) {
            e.preventDefault();

            for (const [key, value] of Object.entries(woocommerceAdvancedTab)) {
                let element = document.querySelector(`#${key}`);
                if (element) {
                    element.value = value;
                }
            }
        }
    }

    if (window.location.href.indexOf("/wp-admin/admin.php?page=wc-settings&tab=general") > -1) {
        const woocommerceGeneralTab = {
            "woocommerce_store_address": "3 Nguyễn Phước Lan",
            "woocommerce_store_city": "Đà Nẵng",
            "woocommerce_store_postcode": "550000",
            "woocommerce_price_thousand_sep": ",",
            "woocommerce_price_decimal_sep": ".",
        }

        const priceThousandSep = document.querySelector('input[name="woocommerce_price_thousand_sep"]');
        const priceDecimalSep = document.querySelector('input[name="woocommerce_price_decimal_sep"]');

        const changeBtn = submitBtn('.submit');
        changeBtn.onclick = function (e) {
            e.preventDefault();
            priceThousandSep.value = ",";
            priceDecimalSep.value = ".";

            for (const [key, value] of Object.entries(woocommerceGeneralTab)) {
                let element = document.querySelector(`#${key}`);
                if (element) {
                    element.value = value;
                }
            }
        }
    }

    if (window.location.href.indexOf("/wp-admin/admin.php?page=wc-settings&tab=account") > -1) {
        const wcAccountTab = {
            "woocommerce_registration_privacy_policy_text": "Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này, để quản lý quyền truy cập vào tài khoản của bạn và cho các mục đích khác được mô tả trong [privacy_policy] của chúng tôi.",
            "woocommerce_checkout_privacy_policy_text": "Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng của bạn, hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này và cho các mục đích khác được mô tả trong [privacy_policy] của chúng tôi.",
        }

        const checkoutLogin = document.querySelector("#woocommerce_enable_checkout_login_reminder");
        const signupLogin = document.querySelector("#woocommerce_enable_signup_and_login_from_checkout");
        const myAccountRegistration = document.querySelector("#woocommerce_enable_myaccount_registration");

        const changeBtn = submitBtn('.submit');
        changeBtn.onclick = function (e) {
            e.preventDefault();
            for (const [key, value] of Object.entries(wcAccountTab)) {
                let element = document.querySelector(`#${key}`);
                if (element) {
                    element.value = value;
                }
            }
            checkoutLogin.checked = true;
            signupLogin.checked = true;
            myAccountRegistration.checked = true;
        }
    }

})();