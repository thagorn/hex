package com.thagorn.hex.hexserver.auth;
import java.util.Objects;

public class UserAlreadyExistsException extends Exception {
  // I just told it to "Generate Everything", not sure if this is right

  public UserAlreadyExistsException() {
  }

  @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof UserAlreadyExistsException)) {
            return false;
        }
        UserAlreadyExistsException userAlreadyExistsException = (UserAlreadyExistsException) o;
        return Objects.equals(this, userAlreadyExistsException);
  }

  @Override
  public int hashCode() {
    return super.hashCode();
  }

  @Override
  public String toString() {
    return "{" +
      "}";
  }

}
