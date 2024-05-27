module Stoream.Engine.Storage.Model.Directory

open System
open File

type Directory =
  { Name: String
    Size: UInt64
    Sub: Directory[]
    Path: String
    Files: File[] }
