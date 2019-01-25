package it.akademija.wizards.models.user;

import javax.validation.constraints.NotNull;

public class UserAuthCommand {

    @NotNull
    private String password;

    public UserAuthCommand() {

    }

    public UserAuthCommand(@NotNull String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
