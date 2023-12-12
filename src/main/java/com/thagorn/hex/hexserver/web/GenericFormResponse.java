package com.thagorn.hex.hexserver.web;

public class GenericFormResponse {
    private final String message;
    private final boolean success;

    public GenericFormResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public String getMessage() {
      return this.message;
    }

    public Boolean getSuccess() {
      return this.success;
    }
}
