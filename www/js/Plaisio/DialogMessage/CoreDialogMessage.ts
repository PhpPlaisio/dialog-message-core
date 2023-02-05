import TriggeredEvent = JQuery.TriggeredEvent;

/**
 * Class for dialog messages.
 */
export class CoreDialogMessage
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * The parameters (an object) for hiding dialogs.
   */
  private static hideParameters: any;

  /**
   * The parameters (an object) for showing dialogs.
   */
  private static showParameters: any;

  /**
   * The jQuery object of the div of this dialog message.
   */
  private $div: JQuery = $('<div></div>');

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Object constructor.
   *
   * @param title    The title of this dialog.
   * @param message  The message of this dialog.
   * @param modal    If set to true, the dialog will have modal behavior; other items on the page will be disabled, i.e.,
   *                 cannot be
   * @param buttons  The specifications of the buttons of this dialog message.
   * @param closeIds The IDs of the buttons that must close this dialog message.
   */
  public constructor(title: string, message: string, modal: boolean, buttons: Array<any>, closeIds: Array<string>)
  {
    this.initDiv(message);
    this.initButtons1(buttons);
    this.initDialog(title, message, modal, buttons);
    this.initButtons2(closeIds);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * @param title    The title of the dialog.
   * @param message  The message of the dialog.
   * @param modal    If set to true, the dialog will have modal behavior; other items on the page will be disabled, i.e.,
   *                 cannot be
   * @param buttons  The specifications of the buttons of the dialog message.
   * @param closeIds The IDs of the buttons that must close the dialog message.
   */
  public static dialog(title: string, message: string, modal: boolean, buttons: Array<any>, closeIds: Array<string>): void
  {
    new CoreDialogMessage(title, message, modal, buttons, closeIds);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Sets the parameters for hiding the dialog.
   *
   * @param hideParameters The parameters (an object) for hiding dialogs.
   */
  public static hide(hideParameters: any)
  {
    CoreDialogMessage.hideParameters = hideParameters;
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Sets the parameters for showing the dialog.
   *
   * @param showParameters The parameters (an object) for showing dialogs.
   */
  public static show(showParameters: any)
  {
    CoreDialogMessage.showParameters = showParameters;
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Closes this dialog message.
   */
  public close(): void
  {
    (this.$div as any).dialog('close');
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Install an event handler.
   *
   * @param event The name of the event.
   * @param callback
   */
  public on(event: string, callback: (event: TriggeredEvent, ui: any) => void): void
  {
    (this.$div as any).on(event, callback);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Initialize the buttons of the dialog.
   *
   * @param buttons  The specifications of the buttons of this dialog message.
   */
  private initButtons1(buttons: Array<any>): void
  {
    const that = this;

    for (let i = 0; i < buttons.length; i++)
    {
      const url        = buttons[i].url;
      buttons[i].click = function ()
      {
        that.redirect(url);
      };
      delete buttons[i].url;
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Initialize the buttons of the dialog.
   *
   * @param closeIds The IDs of the buttons that must close the dialog message.
   */
  private initButtons2(closeIds: Array<string>): void
  {
    const that = this;

    for (let i = 0; i < closeIds.length; i++)
    {
      $('#' + closeIds[i]).on('click', function ()
      {
        that.close();
      });
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Initializes the jQuery dialog.
   *
   * @param title   The title of this dialog.
   * @param message The message of this dialog.
   * @param modal   If set to true, this dialog will have modal behavior; other items on the page will be disabled, i.e.,
   *                cannot be
   * @param buttons The specifications of the buttons of this dialog message.
   */
  private initDialog(title: string, message: string, modal: boolean, buttons: Array<any>): void
  {
    (this.$div as any).dialog(
      {
        title:   title,
        modal:   modal,
        buttons: buttons,
        show:    CoreDialogMessage.showParameters,
        hide:    CoreDialogMessage.hideParameters
      });

    const that = this;
    (this.$div as any).on('dialogclose', function ()
    {
      that.$div.remove();
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Initializes the div HTML element of this dialog.
   *
   * @param message The message of this dialog.
   */
  private initDiv(message: string): void
  {
    this.$div.html(message);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Redirects the user agent.
   *
   * @param url The URL to redirect the user agent to.
   */
  private redirect(url: string | null): void
  {
    let duration: number;

    if (url)
    {
      if (CoreDialogMessage.hideParameters)
      {
        if (CoreDialogMessage.hideParameters.duration)
        {
          duration = CoreDialogMessage.hideParameters.duration;
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

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
// Plaisio\Console\TypeScript\Helper\MarkHelper::md5: da04cf094d41d27b54b4d450e40690b6
