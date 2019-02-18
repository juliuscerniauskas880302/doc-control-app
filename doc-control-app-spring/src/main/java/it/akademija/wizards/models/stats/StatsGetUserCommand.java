package it.akademija.wizards.models.stats;

public class StatsGetUserCommand {

    private String username;
    private Integer docsCount;

    public StatsGetUserCommand() {
    }

    public StatsGetUserCommand(String username, Integer docsCount) {
        this.username = username;
        this.docsCount = docsCount;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getDocsCount() {
        return docsCount;
    }

    public void setDocsCount(Integer docsCount) {
        this.docsCount = docsCount;
    }
}
