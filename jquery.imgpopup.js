/**
 * 圖片彈窗
 *
 * @auther Derek Chan <dchan0831@gmail.com>
 *
 * @return response
 */
;(function($){
    function Imgpopup (self, options) {
        var defaults = {
            'box' : 'img-popup',
            'closeBtn' : $('.close'),
            'tmpl' : '' // 模板
        };
        this.option = $.extend(defaults, options || {});
        this.self = self;
        this.init();
    }

    Imgpopup.prototype = {
        /**
         * 初始化
         *
         * @return response
         */
        init : function () {
            $('body').append('<div id="' + this.option.box + '" class="clearfix"></div>');
            this.popup = $('#' + this.option.box);
            this.bindEvent();
        },
        /**
         * 渲染模板
         *
         * @return response
         */
        renderHtml : function () {
            var tmpl = this.option.tmpl || this.defaultTmpl();
            this.popup.html(tmpl);
            this.shadow();
        },
        /**
         * 默認模板
         *
         * @return string tmpl
         */
        defaultTmpl : function () {
            return '<div class="img-view"><a class="close" href="javascript:;">×</a><p class="img-box"><img src="http://img.8891.com.tw/carInfo/loading.gif" id="photoView"/></p></div>';
        },
        /**
         * 綁定事件
         *
         * @return response
         */
        bindEvent : function () {
            var thisObj = this;
            thisObj.self.each(function (e, v) {
                $(v).bind('click', function () {
                    thisObj.renderHtml();
                    thisObj.callback($(v));
                });
            });
            thisObj.option.closeBtn.live('click', function () {
                $(this).parent().remove();
                thisObj.removeShadow();
            });
        },
        /**
         * 遮罩層
         *
         * @return response
         */
        shadow : function () {
            $('body').append('<div class="wrapbg" id="wrapbg" style="width: 100%;"></div>');
            $('.wrapbg').css({height : $(document).height()});
        },
        /**
         * 删除遮罩層
         *
         * @return response
         */
        removeShadow : function () {
            $('.wrapbg').remove();
        },
        /**
         * 回調函數 - 實例完成時執行
         *
         * @return function callback
         */
        callback : function (element) {
            if (!this.option.tmpl) {
                this.popup.find('img').attr('src', element.attr('data-src'));
            }
            if (this.option.callback) {
                this.option.callback(element, this.popup);
            } 
        }
    };

    $.fn.imgpopup = function (options) {
        return new Imgpopup($(this), options);
    }
})(jQuery);