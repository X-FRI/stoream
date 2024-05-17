package com.xfri.stoream_engine;

import scala.util.Either;

public class Test {
    public static void main(String[] args) {
        if (Demo.test().isLeft()) {
            System.out.println(Demo.test().getOrElse(() -> 10));
        } else {
            System.out.println("字符串！");
        }
    }
}
