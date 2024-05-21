@genType("User_t")
type t = {
  username: string,
  password: string,
}

@genType
module Encrypted = {
  @module("js-md5") external md5: string => string = "md5"

  /// The user's password is encrypted by this function and sent to the engine.
  let encryptedUser = user => {
    {
      username: user.username,
      password: md5(user.password),
    }
  }
}