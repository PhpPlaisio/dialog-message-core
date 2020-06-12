/*global define */

//----------------------------------------------------------------------------------------------------------------------
define(
  'Plaisio/DialogMessage/CoreDialogMessage',

  ['jquery'],

  function ($) {
    "use strict";

    let show;
    let hide;

    //------------------------------------------------------------------------------------------------------------------
    function dialog(title, message, modal, buttons, closeIds) {
      let $div = $('<div></div>');
      $div.html(message);

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].click = function () {};
      }

      $div.dialog({
        title: title,
        modal: modal,
        buttons: buttons,
        show: show,
        hide: hide
      });

      let close = function () {$div.dialog('close');};

      for (let i = 0; i < closeIds.length; i++) {
        $('#' + closeIds[i]).click(close);
      }
    }

    //------------------------------------------------------------------------------------------------------------------
    function setShow(how) {
      show = how;
    }

    //------------------------------------------------------------------------------------------------------------------
    function setHide(how) {
      hide = how;
    }

    //------------------------------------------------------------------------------------------------------------------
    return {
      'show': setShow,
      'hide': setHide,
      'dialog': dialog
    };

    //------------------------------------------------------------------------------------------------------------------
  }
);

//----------------------------------------------------------------------------------------------------------------------
