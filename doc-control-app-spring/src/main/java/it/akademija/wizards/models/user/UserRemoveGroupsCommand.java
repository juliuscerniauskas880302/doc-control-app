package it.akademija.wizards.models.user;

import javax.validation.constraints.NotNull;
import java.util.List;

public class UserRemoveGroupsCommand {

    @NotNull
    private List<String> id;

    public UserRemoveGroupsCommand() {

    }

    public UserRemoveGroupsCommand(@NotNull List<String> id) {
        this.id = id;
    }

    public List<String> getId() {
        return id;
    }

    public void setId(List<String> id) {
        this.id = id;
    }
}
