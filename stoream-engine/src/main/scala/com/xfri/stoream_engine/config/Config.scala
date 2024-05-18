package com.xfri.stoream_engine.config

trait Config

case class LocalStorageConfig(path: String) extends Config
