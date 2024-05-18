package com.xfri.stoream_engine.storage.local.error

import com.xfri.stoream_engine.storage.StorageType.Local
import com.xfri.stoream_engine.storage.error.StorageException

class LocalStorageCannotTouchFileException(path: String, why: String)
    extends StorageException(Local, s"Cannot touch file $path because $why")
