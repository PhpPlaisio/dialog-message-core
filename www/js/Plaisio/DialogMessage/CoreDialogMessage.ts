/**
 * Class for showing, hiding, nd closing dialog messages.
 */
export class CoreDialogMessage
{
  //--------------------------------------------------------------------------------------------------------------------
  private static hideParam;

  private static showParam;

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * @param title The title of the dialog.
   * @param message The message of the dialog.
   * @param modal If set to true, the dialog will have modal behavior; other items on the page will be disabled, i.e.,
   *                cannot be
   * @param buttons
   * @param closeIds
   */
  public static dialog(title: string, message: string, modal: boolean, buttons, closeIds): void
  {
    let $div = $('<div></div>');
    $div.html(message);

    let redirect = function (url)
    {
      let duration;

      if (url)
      {
        if (CoreDialogMessage.hideParam)
        {
          if (CoreDialogMessage.hideParam.duration)
          {
            duration = CoreDialogMessage.hideParam.duration;
          }
          else
          {
            duration = 400;
          }
        }
        else
        {
          duration = 0;
        }

        setTimeout(function ()
        {
          window.location.href = url;
        }, duration);
      }
    }

    for (let i = 0; i < buttons.length; i++)
    {
      let url = buttons[i].url;
      buttons[i].click = function ()
      {
        redirect(url);
      };
      delete buttons[i].url;
    }

    (<any>$div).dialog(
      {
        title: title,
        modal: modal,
        buttons: buttons,
        show: CoreDialogMessage.showParam,
        hide: CoreDialogMessage.hideParam
      });

    let close = function ()
    {
      (<any>$div).dialog('close');
    };
    for (let i = 0; i < closeIds.length; i++)
    {
      $('#' + closeIds[i]).click(close);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  public static show(show)
  {
    CoreDialogMessage.showParam = show;
  }

  //--------------------------------------------------------------------------------------------------------------------
  public static hide(hide)
  {
    CoreDialogMessage.hideParam = hide;
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
