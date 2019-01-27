package it.akademija.wizards.models.user;

import javax.validation.constraints.NotNull;

public class UserAddGroupsCommand {

    @NotNull
    private String[] groupIdList;

    public UserAddGroupsCommand() {

    }

    public UserAddGroupsCommand(@NotNull String[] groupIdList) {
        this.groupIdList = groupIdList;
    }

    public String[] getGroupIdList() {
        return groupIdList;
    }

    public void setGroupIdList(String[] groupIdList) {
        this.groupIdList = groupIdList;
    }
}
