module Stoream.Engine.Storage.Model.File

open System

type File =
  { Name: String
    Path: String
    Size: UInt64 }
