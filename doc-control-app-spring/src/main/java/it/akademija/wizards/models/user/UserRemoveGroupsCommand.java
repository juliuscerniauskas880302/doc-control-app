package it.akademija.wizards.models.user;

import javax.validation.constraints.NotNull;

public class UserRemoveGroupsCommand {

    @NotNull
    private String[] groupIdList;

    public UserRemoveGroupsCommand() {

    }

    public UserRemoveGroupsCommand(@NotNull String[] groupIdList) {
        this.groupIdList = groupIdList;
    }

    public String[] getGroupIdList() {
        return groupIdList;
    }

    public void setGroupIdList(String[] groupIdList) {
        this.groupIdList = groupIdList;
    }
}
