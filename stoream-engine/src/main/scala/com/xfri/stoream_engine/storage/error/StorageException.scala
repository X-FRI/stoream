package com.xfri.stoream_engine.storage.error

import com.xfri.stoream_engine.error.StoreamEngineException
import com.xfri.stoream_engine.storage.StorageType

class StorageException(storageType: StorageType, message: String)
    extends StoreamEngineException(s"$storageType: $message")
