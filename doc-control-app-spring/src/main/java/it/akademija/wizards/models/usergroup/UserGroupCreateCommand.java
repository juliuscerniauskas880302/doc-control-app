package it.akademija.wizards.models.usergroup;

import javax.validation.constraints.NotNull;

public class UserGroupCreateCommand {

    @NotNull(message = "group title is required")
    private String title;

    public UserGroupCreateCommand() {

    }

    public UserGroupCreateCommand(@NotNull(message = "group title is required") String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
