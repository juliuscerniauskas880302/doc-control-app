package it.akademija.wizards.models.usergroup;

public class UserGroupGetCommand {

    private String userGroupId;
    private String title;

    public UserGroupGetCommand() {

    }

    public UserGroupGetCommand(String userGroupId, String title) {
        this.userGroupId = userGroupId;
        this.title = title;
    }

    public String getUserGroupId() {
        return userGroupId;
    }

    public void setUserGroupId(String userGroupId) {
        this.userGroupId = userGroupId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
