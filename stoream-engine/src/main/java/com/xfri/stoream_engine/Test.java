package com.xfri.stoream_engine;

import com.xfri.stoream_engine.storage.local.LocalStorage;
import scala.util.Either;

public class Test {
    public static void main(String[] args) {
        new LocalStorage().touch("Good");
    }
}
