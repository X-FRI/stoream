package com.xfri.stoream_engine.storage.local

import com.xfri.stoream_engine.storage.Storage
import com.xfri.stoream_engine.storage.local.error.LocalStorageCannotTouchFileException

import java.io.File

class LocalStorage extends Storage:
    /** Touch operation
      *
      * @param path New file path
      * @return Return true if the named file does not exist and was successfully created;
      *         false if the named file already exists
      * @throws LocalStorageCannotTouchFileException when file cannot be touched.
      */
    def touch(path: String): Boolean =
        try
            new File(path).createNewFile()
        catch
            case e: Exception => throw LocalStorageCannotTouchFileException(path, e.getMessage)
    end touch
end LocalStorage
