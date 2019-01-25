package it.akademija.wizards.models.user;

import javax.validation.constraints.NotNull;

public class UserPassCommand {

    @NotNull
    private String password;

    public UserPassCommand() {

    }

    public UserPassCommand(@NotNull String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
