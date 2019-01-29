package it.akademija.wizards.models.user;

import javax.validation.constraints.NotNull;
import java.util.List;

public class UserAddGroupsCommand {

    @NotNull
    private List<String> groupIdList;

    public UserAddGroupsCommand() {

    }

    public UserAddGroupsCommand(@NotNull List<String> groupIdList) {
        this.groupIdList = groupIdList;
    }

    public List<String> getGroupIdList() {
        return groupIdList;
    }

    public void setGroupIdList(List<String> groupIdList) {
        this.groupIdList = groupIdList;
    }
}
