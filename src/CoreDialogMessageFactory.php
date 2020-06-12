<?php
declare(strict_types=1);

namespace Plaisio\DialogMessage;

use Plaisio\PlaisioObject;

/**
 * Factory for creating dialog messages.
 */
class CoreDialogMessageFactory extends PlaisioObject implements DialogMessageFactory
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Creates a dialog message.
   *
   * @return DialogMessage
   */
  public function create(): DialogMessage
  {
    return new CoreDialogMessage($this);
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
