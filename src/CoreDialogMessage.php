<?php
declare(strict_types=1);

namespace Plaisio\DialogMessage;

use Plaisio\Helper\Html;
use Plaisio\PlaisioObject;
use SetBased\Helper\Cast;

/**
 * Generates JavaScript code for dialog messages.
 */
class CoreDialogMessage extends PlaisioObject implements DialogMessage
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * The data for the buttons of the dialog.
   *
   * @var array
   */
  private array $buttons = [];

  /**
   * The IDs of the buttons that close the dialog on click.
   *
   * @var string[]
   */
  private array $closeIds = [];

  /**
   * If false, the message is plain text. If true, the message is HTML code.
   *
   * @var bool
   */
  private bool $isHtml = false;

  /**
   * The message of the dialog.
   *
   * @var string|null
   */
  private ?string $message = null;

  /**
   * If set to true, the dialog will have modal behavior.
   *
   * @var bool
   */
  private bool $modal = false;

  /**
   * The title of the dialog.
   *
   * @var string|null
   */
  private ?string $title = null;

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Adds a button to the dialog.
   *
   * @param string      $text       The text of the button.
   * @param array       $attributes The additional attributes of the button.
   * @param bool        $close      If true, clicking the button will close the dialog. If false, the action of the
   *                                button has to be set via other means.
   * @param string|null $uri        The URI to redirect the user agent to after the dialog has been closed (implies
   *                                $close = true).
   *
   * @return static
   */
  public function addButton(string $text, array $attributes = [], bool $close = true, ?string $uri = null): DialogMessage
  {
    $attributes['text'] = $text;
    $attributes['url']  = $uri;

    if ($close || $uri!==null)
    {
      $id = Cast::toManString($attributes['id'] ?? null, '');
      if ($id==='')
      {
        $id               = Html::getAutoId();
        $attributes['id'] = $id;
      }

      $this->closeIds[] = $id;
    }

    $this->buttons[] = $attributes;

    return $this;
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Sets the message of the dialog.
   *
   * @param string|null $message The message of the dialog.
   * @param bool        $isHtml  If false, the message is plain text. If true, the message is HTML code.
   *
   * @return static
   */
  public function message(?string $message, bool $isHtml = false): DialogMessage
  {
    $this->message = $message;
    $this->isHtml  = $isHtml;

    return $this;
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Set modal. If set to true, the dialog will have modal behavior;
   *
   * @param bool $modal
   *
   * @return static
   */
  public function modal(bool $modal): DialogMessage
  {
    $this->modal = $modal;

    return $this;
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Shows the dialog. That is, generates JavaScript for display the dialog.
   */
  public function show(): void
  {
    $args = [$this->title,
             ($this->isHtml) ? $this->message : Html::txt2Html($this->message),
             $this->modal,
             $this->buttons,
             $this->closeIds];
    $this->nub->assets->jsAdmFunctionCall(__CLASS__, 'dialog', $args);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Sets the title of the dialog.
   *
   * @param string|null $title
   *
   * @return static
   */
  public function title(?string $title): DialogMessage
  {
    $this->title = $title;

    return $this;
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
