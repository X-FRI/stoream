package com.xfri.stoream_engine.storage.local

class TestLocalStorage extends munit.FunSuite:
    test("touch") {
        LocalStorage().touch("test")
    }
end TestLocalStorage
